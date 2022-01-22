const SECRET = require('./SECRET_KEYS')
var request = require('request');
var Compiler = require('../../models/compiler')
var CodeEditor = require('../../models/codeEditor')
var Lab = require('../../models/labs')
var User = require('../../models/user')

const languageCodes = {
    "Python 3" : "python3",
    "Python 2" : "python2",
    "Java" :"java",
    "C":"c",
    "C-99":"c99",
    "C++":"cpp",
    "C++14":"cpp14",
    "C++17":"cpp17"
}
//to create a new compiler request
module.exports.compile = async function (req, res) {
    // console.log(req.body.code);
    var editor = await CodeEditor.findById(req.body.code);
    // console.log(editor);
    var program = {
        script: editor.content.ops[0].insert,
        language: languageCodes[req.body.language],
        clientId: SECRET.CLIENT_ID,
        clientSecret: SECRET.CLIENT_SECRET_KEY,
        stdin: req.body.input,
    };
    if (req.body.languageVersion) {
        program.versionIndex = req.body.languageVersion;
    }
    let newCompileRequest = await Compiler.create({
        code: program.script,
        language: req.body.language,
        user: req.user._id,
        languageVersion: req.body.languageVersion,
        input:req.body.input,
        lab: req.body.lab,
    })

    // if object created
    if (newCompileRequest) {
        newCompileRequest = await newCompileRequest.save();
        request({
                url: 'https://api.jdoodle.com/v1/execute',
                method: "POST",
                json: program
            },
            async function (error, response, body) {
                // console.log(error,response,body);
                newCompileRequest.statusCode = body.statusCode;
                newCompileRequest.output = body.output;
                newCompileRequest.CPUTime = body.cpuTime;
                newCompileRequest.memory = body.memory;
                newCompileRequest = await newCompileRequest.save();
                newCompileRequest.input = req.body.input;
                if (response.statusCode ==200){
                    return res.status(201).json({
                        message: "API request successfull",
                        success: true,
                        data: newCompileRequest,
                    });
                }
                else{
                    return res.status(400).json({
                        message: "API request unsuccessfull",
                        success: false,
                        data: newCompileRequest,
                    });
                }
            });

    } else {
        return res.status(400).json({
            success: false,
            message: "Error in calling API",
            data: newCompileRequest,
        });
    }
}

module.exports.submitCode = async function (req, res) {
    let uniqueCode = req.body.code;
    let codeEditorExist = await CodeEditor.findOne({ code: uniqueCode });
    if(codeEditorExist){
        codeEditorExist.contentSaved = req.body.content;
        codeEditorExist.submittedAt = req.body.submittedAt;
        codeEditorExist.finalSubmit = req.body.finalSubmit;
        codeEditorExist.save();
        return res.status(200).json({
            message: "Lab Work submitted Successfully!!",
            success: true,
        });
    }
    else{
        return res.json(422, {
            message: "Error while submitting code!!",
        });
    }


}


module.exports.fetchLabDetails = async function (req, res) {
    let userId = req.body.userId;
    let labId = req.body.labId;
    if(labId && userId){
        let user = await User.findById(userId);
        let lab = await Lab.findById(labId).populate("codeEditor","code lab owner contentSaved finalSubmit submittedAt")
        .populate({
            path: "codeEditor",
            populate: {
              path: "owner",
              select: "SID name email role",
            },
          });
        if(user && lab && user.role === "Teacher"){
            return res.status(200).json({
                message: "Lab Details FetchedSuccessfully!!",
                success: true,
                data: lab
            });
        }

    }
    return res.json(422, {
        message: "Error while Fetching Details!",
    });
}