const express = require("express");

const connectdb = require("./config/db");
const app = express();
const port = 3000;

const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/",authRouter)
app.use("/",profileRouter);
app.use("/",requestRouter);

connectdb()
  .then(() => {
    console.log("Database connection successfully");
    app.listen(port, () => {
      console.log(`Server port listing on ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database cannot connected");
  });

