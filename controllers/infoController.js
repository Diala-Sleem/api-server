const infoModel = require("../models/infoModel");

exports.testConnectFun = (req, res, next) => {
  infoModel
    .testConnect()
    .then((msg) => {
      res.send(msg);
    })
    .catch((err) => {
      res.send(err);
    });
};
