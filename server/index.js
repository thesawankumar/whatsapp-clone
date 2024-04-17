import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Route from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();

const PORT = process.env.PORT || 6000;

const app = express();
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1", Route);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running succeSsfully on PORT ${PORT}`);
});
