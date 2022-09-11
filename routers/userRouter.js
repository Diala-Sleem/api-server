const userModel = require("../models/userModel");
const router = require("express").Router();

router.post("/register", (req, res, next) => {
  userModel
    .register(req.body.userName, req.body.email, req.body.password)
    .then((user) => {
      res
        .status(200)
        .json({ user: user, msg: "new user registered successfully" });
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
});


router.post("/login", (req, res, next) => {
  userModel
    .login(req.body.email, req.body.password)
    .then((token) => {
      res.status(200).json({ token: token, msg: "user login successfully" });
    })
    .catch((err) => {
      res.status(400).json({ err: err, msg: "user not logged in" });
    });
});

module.exports = router;
