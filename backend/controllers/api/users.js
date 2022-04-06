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
          avatar: ""
        };
        let user1 = await User.create(userDetails);
        if (user1) {
          let tokenDetails = {
            name: user1.name,
            _id: user1._id,
            role: user1.role,
            SID: user1.SID,
            email: user1.email,
          }
          return res.json(200, {
            message: "Sign up successful",
            success: true,
            data: {
              token: jwt.sign(tokenDetails, "CODEZONE", {
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
      let tokenDetails = {
        name: user.name,
        _id: user._id,
        role: user.role,
        SID: user.SID,
        email: user.email,
      }
        return res.status(200).json({
            message: "Here is the token",
            success: true,
            data: {
              token: jwt.sign(tokenDetails, "CODEZONE", { expiresIn: "100000000" }),
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

//to fetch user details
module.exports.fetchUserDetails = async function (req,res){
  let user = await User.findById(req.params.id);
  if(user){
    return res.status(200).json({
      message: "User Details fetched successfully!!!",
      success: true,
      data: {
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
  }else{
    return res.json(200, {
      message: "Sign up not successful",
    });
  }

}

//to update user profile
module.exports.updateProfile = async function (req, res) {
  let user = await User.findOne({email: req.body.email});
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
                let user1 = await User.findOne({email: req.body.email});
                let tokenDetails = {
                  name: user1.name,
                  _id: user1._id,
                  role: user1.role,
                  SID: user1.SID,
                  email: user1.email,
                }
                return res.status(200).json({
                  message: "Profile updated Successfully",
                  success: true,
                  data: {
                    token: jwt.sign(tokenDetails, "CODEZONE", { expiresIn: "100000000" }),
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
                let tokenDetails = {
                  name: user.name,
                  _id: user._id,
                  role: user.role,
                  SID: user.SID,
                  email: user.email,
                }
                return res.status(422).json({
                  message: "Error while saving... Try after sometime!!!",
                  data: {
                    token: jwt.sign(tokenDetails, "CODEZONE", {
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
          let user1 = await User.findOne({email: req.body.email});
          let tokenDetails = {
            name: user1.name,
            _id: user1._id,
            role: user1.role,
            SID: user1.SID,
            email: user1.email,
          }
          return res.status(200).json({
            message: "Profile updated Successfully",
            success: true,
            data: {
              token: jwt.sign(tokenDetails, "CODEZONE", { expiresIn: "100000000" }),
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
      let tokenDetails = {
        name: user.name,
        _id: user._id,
        role: user.role,
        SID: user.SID,
        email: user.email,
      }
      return res.status(422).json({
        message: "Incorrect Old Password! Profile not updated",
        data: {
          token: jwt.sign(tokenDetails, "CODEZONE", {
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
