// const express =require('express')  //method1
import express from "express"; //method-2
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
dotenv.config( {} );
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js"

import connectDB from "./config/database.js";

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());


//routes
app.use("/api/v1/user", userRoute);
app.use("api/v1/message",messageRoute)

//http://localhost:8080/api/v1/user/register
 const PORT= process.env.PORT || 5000;
app.listen(PORT, ()=>{
  connectDB();
  console.log(`your server is running at ${PORT}`);
})