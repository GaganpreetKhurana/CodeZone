const SECRET = require('./SECRET_KEYS')
console.log(SECRET)
var request = require('request');
var Compiler = require('../../models/compiler')

const languageCodes = {
    "Python3" : "python3",
    "Python2" : "python2",
    "Java" :"java",
    "C":"c",
    "C-99":"c99",
    "C++":"cpp",
    "C++14":"cpp14",
    "C++17":"cpp17"
}
//to create a new compiler request
module.exports.compile = async function (req, res) {

    var program = {
        script: req.body.code,
        language: languageCodes[req.body.language],
        clientId: SECRET.CLIENT_ID,
        clientSecret: SECRET.CLIENT_SECRET_KEY,
        stdin: req.body.input,
    };
    if (req.body.languageVersion) {
        program.versionIndex = req.body.languageVersion;
    }
    let newCompileRequest = await Compiler.create({
        code: req.body.code,
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
                newCompileRequest.statusCode = body.statusCode;
                newCompileRequest.output = body.output;
                newCompileRequest.CPUTime = body.cpuTime;
                newCompileRequest.memory = body.memory;
                newCompileRequest = await newCompileRequest.save();

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