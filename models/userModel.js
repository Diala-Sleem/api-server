const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  userName: String, //
  email: String, //
  password: String, //
});
let User = mongoose.model("user", userSchema);
url = "mongodb://localhost:27017/apiserver";

exports.register = (userName, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((doc) => {
        if (doc) {
          mongoose.disconnect();
          reject("this email is exist");
        } else {
          bcrypt
            .hash(password, 10)
            .then((hashPassword) => {
              let newUser = new User({
                userName: userName,
                email: email,
                password: hashPassword,
              });
              newUser
                .save()
                .then((user) => {
                  mongoose.disconnect(); //
                  resolve(user);
                })
                .catch((error) => {
                  mongoose.disconnect();
                  reject(error);
                });
            })
            .catch((error) => {
              mongoose.disconnect();
              reject(error);
            });
        }
      });
  });
};
//----------------------------------------------------------------
let privatekey =
  "this is my secret key ökjdsfhösahfieföaoiewjfödkföldskjfioe";

//----------------------------------------------------------------
exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return User.findOne({ email: email });
      })
        .then((user) => {
                     //       console.log(user);

        if (!user) {
          mongoose.disconnect();
          reject("user not found invalid Email");
        } else {
          bcrypt
            .compare(password, user.password)
            .then((same) => {
              if (same) {
                //send token
                let token = jwt.sign(
                  { id: user._id, userName: user.userName },
                  privatekey
                  /*,
                  { expiresIn: "1h" }*/
                );
                 // console.log(token)
                //--------
                mongoose.disconnect();
                  resolve(token);
                //   jwt.decode
                //   console.log(jwt.decode());
              } else {
                mongoose.disconnect();
                reject("invalid password");
              }
            })
            .catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
        }
      });
  });
};
