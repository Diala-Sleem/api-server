const mongoose = require("mongoose");
const Joi = require("joi");
const mysql = require("mysql2");

let infoSchemaJoiValidtion = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().required().max(100).min(18),
});
//-------------------mysql----------------------------------------------------------------

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "apiserver",
});

//----------------------------------------------------------------------------------------

exports.postSQLinfoData = (name, age) => {
  return new Promise((resolve, reject) => {
    //---joi----
    let validation = infoSchemaJoiValidtion.validate({
      name: name,
      age: age,
    });

    if (validation.error) {
      mongoose.disconnect();
      reject(validation.error.details[0].message);
    }
    //---------sql-------------
    connection.query(
      "insert into students(name,age) values (?,?) ",
      [name, age],
      (err, result, fields) => {
        if (err) {
          reject(err.message);
        }
        if (result) {
          resolve("inserted !!");
        }
      }
    );
  });
};
