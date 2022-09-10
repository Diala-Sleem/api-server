const { urlencoded } = require("express");
const express = require("express");
const app = express();
const infoRouter = require('./routers/infoRouter')

//----- middleware to tell we dale with json data
app.use(express.json())

//--------middleware to transform the data that come from the frontend <form> to json -------------
app.use(express.urlencoded({extended:true}))
//--------------------------------




app.use("/", infoRouter);




app.listen(3000, () => console.log("server is run in port 3000"));
