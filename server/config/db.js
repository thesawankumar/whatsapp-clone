import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((error) => {
      console.log("DB cONNECTION FAILED");
      console.error(error);
      process.exit(1);
    });
};
export default connectDB;
