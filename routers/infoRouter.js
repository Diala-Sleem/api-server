const route = require("express").Router();
const infoModel = require("../models/infoModel");
const { testConnectFun } = require("../controllers/infoController");

const jwt = require("jsonwebtoken");
//----------------------------------------------------------------

route.get("/", testConnectFun);

//---------------verify token before access to the other route (register and login)--------------
let privatekey = "this is my secret key ökjdsfhösahfieföaoiewjfödkföldskjfioe";

let verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  //console.log("token: " + token);
  if (!token) {
    res.status(400).json({ msg: "access rejected.....!!" });
  }
  try {
    jwt.verify(token, privatekey);
    next();
  } catch (err) {
    res.status(400).json({ err: err, msg: "verif rejected.....!!" });
  }
};

//----------------------------------------------------------------
route.post("/addinfo", verifyToken, (req, res, next) => {
  infoModel
    .postInfoData(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.age,
      req.body.phone
    )
    .then((msg) => {
      // res.send(msg);
      res.status(200).json(msg);
    })
    .catch((err) => {
      //res.send(err) // the are same (res.send) or (res.status(000).json)
      res.status(404).json(err);
    });
});

route.get("/getAllInfo", verifyToken, (req, res, next) => {
  let token = req.headers.authorization;
  let user = jwt.decode(token, { complete: true });
  infoModel
    .getAllInfoModele()
    .then((data) => {
      res.status(200).json({ info: data, user: user });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.get("/getinfobyId/:id", verifyToken, (req, res, next) => {
  let id = req.params.id;
  infoModel
    .getInfoByIdModele(id)
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.delete("/deleteinfobyId/:id", verifyToken, (req, res, next) => {
  let id = req.params.id;
  infoModel
    .deleteInfoByIdModele(id)
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.patch("/updateinfobyId/:id", verifyToken, (req, res, next) => {
  infoModel
    .updateInfoModele(
      req.params.id,
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.age,
      req.body.phone
    )
    .then((msg) => {
      res.status(200).json(msg);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = route;
