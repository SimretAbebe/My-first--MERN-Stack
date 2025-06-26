const express = require('express');
const dotenv = require("dotenv").config();
const cors = require('cors'); 
const  {mongoose} = require('mongoose')
const cookieParser = require("cookie-parser");
const app =express();



mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


app.use(express.json())
app.use(express.urlencoded({extended: false }))
app.use(cookieParser());


app.use('/' , require('./routes/auth'))

const port = 7000;
app.listen(port, () => console.log(`server is running u are on the line on port ${port}`))
