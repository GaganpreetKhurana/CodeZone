const Classes = require("../../models/class");
const User = require("../../models/user");
const Lab = require("../../models/labs");
const codeEditor = require("../../models/codeEditor");

//to create a new lab
module.exports.createLab = async function(req, res) {
    //find user by id and check role of user should be 'Teacher' only then create the lab
    //else give error back not authorized to create classroom
    let user = await User.findById(req.user._id);
    let classExistWithClassId = await Classes.findOne({
        _id: req.body.classroomId,
    });
    if (user.role === "Student" || !classExistWithClassId) {
        return res.json(422, {
            message: "Not Authorized to create a new Lab",
        });
    } else {
        //create a new lab
        //if user is found then create lab and in classesCreated add this class _id in it
        let lab = await Lab.create({
            creator: req.user._id,
            question: req.body.question,
            input: req.body.input,
            output: req.body.output,
            description: req.body.description,
            language: req.body.language,
            maxMarks: req.body.maxMarks,
            evaluateLab: req.body.evaluateLab
        });
        //add the lab_id in class.labsCreated
        if(lab){
            classExistWithClassId.labsCreated.push(lab);
            classExistWithClassId.save();
            return res.status(200).json({
                message: "Lab created successfully",
                success: true,
                data: {
                    code: lab,
                },
            });
        }
        else {
            return res.status(422).json({
                message: "Error in creating lab",
            });
        }
    }
}

//to fetch existing lab details
module.exports.fetchExistingLabDetails = async function(req,res){
    let classExistWithClassId = await Classes.findOne ( {
        _id : req.params.classroomId ,
    } ).select("labsCreated")
    .populate(
        "labsCreated",
        "creator question input output maxMarks description language createdAt evaluateLab",null,{ sort: { 'created_at': -1 } }
    ).exec();
    if (classExistWithClassId) {
        return res.status(200).json({
            message: "Classroom joined successfully",
            data: classExistWithClassId.labsCreated,
            success: true,
        });
        
    }else{
        return res.json(422, {
            message: "Error in Fetching Lab Details",
        }); 
    }
}

//create editor for user
module.exports.createEditor = async function(req,res){

    let userId = req.params.userId;
    let labId = req.params.labId;
    //checking user should exist
    let user = await User.findById(userId);
    //checking lab should exist 
    let lab = await Lab.findById(labId);
    if(!user || !lab){
        return res.json(422, {
            message: "User or Lab doesn't exist in database",
        }); 
    }
    else{
        //userId+labId is unique in codeEditor schema
        let uniqueCode = `${userId}+${labId}`;
        let codeEditorExist = await codeEditor.findOne({ code: uniqueCode });
        if(codeEditorExist){
            //check if this exist then return the details present in it 
            //only if userId === req.user._id or if userId has role ===teacher
            if(userId === req.user._id || user.role === "Teacher") {
                return res.status(200).json({
                    message: "Code Editor",
                    data: {editor:codeEditorExist,lab},
                    success: true,
                });
            }
            else{
                return res.json(422, {
                    message: "Not authorized to see someone's code",
                });
            }
        }
        else{
            // create a new editor and fill the required details
            let newEditor = await codeEditor.create({
                code: uniqueCode,
                lab: labId,
                content: '',
                customInput:lab.input,
                customOutput:lab.output,
                languageSelected:lab.language,
                owner:req.user._id,
                evaluateLab: lab.evaluateLab,
                contentSaved: '',
                finalSubmit: false,
            });
            if(newEditor){
                // add codeEditor._id to codeEditor array of labs
                lab.codeEditor.push(newEditor._id);
                lab.save();
                return res.status(200).json({
                    message: "Code Editor",
                    data: {editor:newEditor,lab},
                    success: true,
                });
            }
            else{
                return res.json(422, {
                    message: "Error in creating code editor",
                });
            }

        }

    }
     
}