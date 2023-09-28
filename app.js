require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const connectDB = require("./db/connect");

const notFound = require("./middlewares/notFoundMiddleWare");
const errorHandler = require("./middlewares/errorHandler");
const authorizeUser = require("./middlewares/authorization");

const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const taskRouter = require("./routes/task");

app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", authorizeUser, categoryRouter);
app.use("/api/v1/task", authorizeUser, taskRouter);
app.get("/", (req, res) => res.send("Hello World!"));

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`App is listening at port ${port}!`));
  } catch (error) {
    console.log(error);
  }
};

start();
