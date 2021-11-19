const Classes = require("../../models/class");
const User = require("../../models/user");
const Lab = require("../../models/labs");

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
        });
        //add the lab_id in class.labsCreated
        if(lab){
            classExistWithClassId.labsCreated.push(lab);
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