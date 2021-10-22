const Classes = require("../../models/class");
const User = require("../../models/user");

//to generate unique code for classroom
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

//to create a new classroom
module.exports.create = async function (req, res) {
  let codeGenerated = false,
    code;
  while (!codeGenerated) {
    //generate code first of length 7
    code = await createClassCode();
    //check that code should not exist for existing classroom
    let classExist = await Classes.findOne({ code: code });
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
    let classroom = await Classes.create({
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
      return res.status(200).json({
        message: "Classroom created successfully",
        success: true,
        data: {
          code: code,
        },
      });
    } else {
      return res.status(422).json({
        message: "Error in creating classroom",
      });
    }
  }
};

//to join an existing classroom using the code provided
module.exports.join = async function (req, res) {
  let classCode = req.body.code;
  let user_id = req.user._id;
  //find user
  let user = await User.findById(user_id);
  //find class
  if (!classCode) {
    return res.status(422).json({
      message: "Please enter valid classcode to join!!",
    });
  }
  let classroom = await Classes.findOne({ code: classCode });

  if (user && classroom) {
    //check if user has already joined it or not
    //add user._id in students[] present in found class

    //add class._id in user's classesJoined array
    if (user.role === "Teacher") {
      if (classroom.teachers.includes(user_id)) {
        return res.status(422).json({
          message: "Classroom already joined",
        });
      }
      classroom.teachers.push(user_id);
      classroom.save();
      user.classesJoined.push(classroom._id);
      user.save();
    } else {
      if (classroom.students.includes(user_id)) {
        return res.status(422).json({
          message: "Classroom already joined",
        });
      }
      classroom.students.push(user_id);
      classroom.save();
      user.classesJoined.push(classroom._id);
      user.save();
    }
    return res.status(200).json({
      message: "Classroom joined successfully",
      success: true,
    });
  }
  return res.status(422).json({
    message: "Error in joining classroom",
  });
};
