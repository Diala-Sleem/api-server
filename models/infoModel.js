const mongoose = require("mongoose");

let infoSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  phone: Number,
});

let Info = mongoose.model("info", infoSchema);
let url = "mongodb+srv://diala:1234@cluster0.5uhxunf.mongodb.net/apiserver";

exports.testConnect = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        mongoose.disconnect();
        resolve("connected");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.postInfoData = (firstName, lastName, email, age, phone) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        let newInfo = new Info({
          firstName: firstName,
          lastName: lastName,
          email: email,
          age: age,
          phone: phone,
        });
        newInfo.save()
          .then((data) => {
            mongoose.disconnect();
            //console.log(data);
            resolve(data);
          })
          .catch((err) => {
            mongoose.disconnect();
            console.log(err);

            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
