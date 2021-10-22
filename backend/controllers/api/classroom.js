const Class = require("../../models/class");
const User = require("../../models/user");

//to create a new classroom
async function createClassCode() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
module.exports.create = async function (req, res) {
  console.log("createclassroom called");
  console.log(req);
  let codeGenerated = false,
    code;
  while (!codeGenerated) {
    //generate code first of length 7
    code = await createClassCode();
    //check that code should not exist for existing classroom
    let classExist = await Class.findOne({ code: code });
    if (classExist) {
      //generate code again
      codeGenerated = false;
    } else {
      codeGenerated = true;
    }
  }

  //find user by id and check role of user should be 'Teacher' only then create the classroom
  //else give error back not authorized to create classroom
  let user = await User.findById(req.user._id);
  if (user.role === "Student") {
    return res.json(422, {
      message: "Not Authorized to create classroom",
    });
  } else {
    //if user is found then create classroom and in classesCreated add this class _id in it

    let classroom = await Class.create({
      subject: req.body.subject,
      description: req.body.description,
      batch: req.body.batch,
      creator: req.user._id,
      code: code,
    });

    if (classroom) {
      //add thi user in teachers array of that class as well
      classroom.teachers.push(req.user._id);
      classroom.save();
      user.classesCreated.push(classroom);
      user.save();
      return res.json(200, {
        message: "Classroom created successfully",
        success: true,
        data: {
          code: code,
        },
      });
    } else {
      return res.json(422, {
        message: "Error in creating classroom",
      });
    }
  }
};
