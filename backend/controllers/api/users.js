const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//for the user to sign up
module.exports.signup = async function (req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.json(422, {
      message: "User with this email id already exists",
    });
  }
  if (req.body.password != req.body.confirm_password) {
    return res.json(422, {
      message: "Password and Confirm Password Fields does not match",
    });
  }
  await bcrypt.genSalt(10, async function (err, salt) {
    await bcrypt.hash(req.body.password, salt, async function (err, hash) {
      // Store hash in database here
      if (hash) {
        let userDetails = {
          name: req.body.name,
          email: req.body.email,
          password: hash,
          role: req.body.role,
          SID: req.body.SID,
          avatar: "",
        };
        let user1 = await User.create(userDetails);
        if (user1) {
          return res.json(200, {
            message: "Sign up successful",
            success: true,
            data: {
              token: jwt.sign(user1.toJSON(), "CODEZONE", {
                expiresIn: "100000000",
              }),
              user: {
                email: user1.email,
                name: user1.name,
                id: user1._id,
                SID: user1.SID,
                role: user1.role,
                avatar: user1.avatar,
              },
            },
          });
        }
      } else {
        return res.json(200, {
          message: "Sign up not successful",
        });
      }
    });
  });
};

//to login the user
module.exports.login = async function (req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (!user ) {
    return res.json(422, {
      message: "Invalid Email / Password",
    });
  }
  else{
  bcrypt.compare(req.body.password, user.password, function(err, result) {
    if (result) {
        return res.json(200, {
            message: "Here is the token",
            success: true,
            data: {
              token: jwt.sign(user.toJSON(), "CODEZONE", { expiresIn: "100000000" }),
              user: {
                email: user.email,
                name: user.name,
                id: user._id,
                SID: user.SID,
                role: user.role,
                avatar: user.avatar,
              },
            },
          });
    }
    else {
      // access denied
      return res.json(422, {
        message: "Invalid Email / Password",
      });
    }
  });
}
  
};
//to upload user image
module.exports.updateProfile = async function (req, res) {
  let user = await User.findById(req.body.id);
  if (!user ) {
    return res.json(500, {
      message: "Server Error!! Please try after sometime",
    });
  }
  else{
  bcrypt.compare(req.body.previousPassword, user.password, async function(err, result) {
    if (result) {
        if(req.body.newPassword){
           await bcrypt.genSalt(10,async function (err, salt) {
            await bcrypt.hash(req.body.newPassword, salt,async function (err, hashed) {
              if (hashed) {
                user.password = hashed;
                if(req.body.avatar){
                  user.avatar = req.body.avatar;
                }
                if(req.body.name){
                  user.name = req.body.name;
                }
                if(req.body.SID){
                  user.SID = req.body.SID;
                }
                user.save();
                let user1 = await User.findById(req.body.id);
                return res.json(200, {
                  message: "Profile updated Successfully",
                  success: true,
                  data: {
                    token: jwt.sign(user.toJSON(), "CODEZONE", { expiresIn: "100000000" }),
                    user: {
                      email: user1.email,
                      name: user1.name,
                      id: user1._id,
                      SID: user1.SID,
                      role: user1.role,
                      avatar: user1.avatar,
                    },
                  },
                });
              }
              else{
                return res.json(422, {
                  message: "Error while saving... Try after sometime!!!",
                  data: {
                    token: jwt.sign(user.toJSON(), "CODEZONE", {
                      expiresIn: "100000000",
                    }),
                    user: {
                      email: user.email,
                      name: user.name,
                      id: user._id,
                      SID: user.SID,
                      role: user.role,
                      avatar: user.avatar,
                    },
                  },
                });
              }
            });

          });

        }
        else{
          if(req.body.avatar){
            user.avatar = req.body.avatar;
          }
          if(req.body.name){
            user.name = req.body.name;
          }
          if(req.body.SID){
            user.SID = req.body.SID;
          }
          user.save();
          let user1 = await User.findById(req.body.id);
          return res.json(200, {
            message: "Profile updated Successfully",
            success: true,
            data: {
              token: jwt.sign(user.toJSON(), "CODEZONE", { expiresIn: "100000000" }),
              user: {
                email: user1.email,
                name: user1.name,
                id: user1._id,
                SID: user1.SID,
                role: user1.role,
                avatar: user1.avatar,
              },
            },
          });
        }
        
    }
    else {
      // access denied
      return res.json(422, {
        message: "Incorrect Old Password! Profile not updated",
        data: {
          token: jwt.sign(user.toJSON(), "CODEZONE", {
            expiresIn: "100000000",
          }),
          user: {
            email: user.email,
            name: user.name,
            id: user._id,
            SID: user.SID,
            role: user.role,
            avatar: user.avatar,
          },
        },
      });
    }
  });
}


  
};
