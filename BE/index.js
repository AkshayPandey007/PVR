import Express from "express";
import movieSlotRouter from "./routes/movie-slot.routes.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
import {connection} from "./database/db.js"
import { config as dotenvConfig } from "dotenv";

dotenvConfig();
const app = Express();
app.use(Express.json());
app.use(cors());
app.get("/" , (req,res)=>{
  res.send("Welcome to home Page")
})
app.use("/api/auth", userRouter);
app.use("/api/movie", movieSlotRouter);


app.listen(process.env.PORT , async()=>{
  try{
    await connection
    console.log("connected to DB successfully")
  }
  catch(err){
    console.log("connecting DB error")
    console.log(err)
  }
  console.log(`Listening on port ${process.env.PORT}`)
})
