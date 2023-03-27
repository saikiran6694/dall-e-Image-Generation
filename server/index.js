import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./mongoDB/connect.js";
import postRoute from "./routes/postRoute.js";
import dalleRoute from "./routes/dalleRoute.js";

dotenv.config();

const port = process.env.PORT || 9002;
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded());

app.use("/api/v1/post", postRoute);
app.use("/api/v1/dalle", dalleRoute);

app.get("/", (req, res) => {
  res.json("Hello from DALL-E");
});

const startServer = () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server running on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
