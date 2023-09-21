require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const notFound = require("./middlewares/notFoundMiddleWare");
const errorHandler = require("./middlewares/errorHandler");
const userRouter = require("./routes/user");

app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRouter);
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
