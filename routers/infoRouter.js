const route = require("express").Router();

const { model, models } = require("mongoose");
const infoModel = require("../models/infoModel");

route.get("/", (req, res, next) => {
  infoModel
    .testConnect()
    .then((msg) => {
      res.send(msg);
    })
    .catch((err) => {
      res.send(err);
    });
});

route.post("/addinfo", (req, res, next) => {
  infoModel
    .postInfoData(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.age,
      req.body.phone
    )
    .then((msg) => {
      res.send(msg);
    })
    .then(() => console.log("done and for some resene i can not <catch>  "))
})

module.exports = route;
