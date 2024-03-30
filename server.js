import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
dotenv.config({ path: "" });
connectDB();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
// respond with "hello world" when a GET request is made to the homepage
app.use("/api/v1/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    colors.bgCyan.white(
      `Server is running on ${process.env.DEV_MODE} and on port ${PORT}`
    )
  );
});
