const mongoose = require("mongoose");

let infoSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  phone: Number,
});

let Info = mongoose.model("info", infoSchema);
let url = "mongodb://localhost:27017/apiserver";

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
        newInfo
          .save()
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

exports.getAllInfoModele = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return Info.find();
      })
      .then((data) => {
        mongoose.disconnect();
        resolve(data);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  }).catch((err) => {
    reject(err);
  });
};

exports.getInfoByIdModele = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return Info.findById(id);
      })
      .then((data) => {
        mongoose.disconnect();
        resolve(data);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  }).catch((err) => {
    reject(err);
  });
};

exports.deleteInfoByIdModele = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return Info.deleteOne({ _id: id });
      })
      .then((data) => {
        mongoose.disconnect();
        resolve(data, "info deleted");
      })
      .catch((err) => {
        console.log("see what", err);

        mongoose.disconnect();
        reject(err, "info not delete");
      });
  });
};

exports.updateInfoModele = (id, firstName, lastName, email, age, phone) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return Info.updateOne(
          { _id: id },
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            age: age,
            phone: phone,
          }
        );
      })
      .then((result) => {
        mongoose.disconnect();
        resolve(result);
      })
      .catch((err) => {
        mongoose.disconnect(), reject(err);
      });
  });
};
