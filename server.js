require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const proudctRoute = require("./routes/productRoute");
// const userRoute = require("./routes/userRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
var cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND = process.env.FRONTEND;

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors("http://127.0.0.1:5173/"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Hazem
// admin123_Hazem
// mongodb+srv://Hazem:admin123_Hazem@hazemapi.a0fawvi.mongodb.net/

// routes
app.use("/api/products", proudctRoute);
// app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello NOde ApI");
});

app.use(errorMiddleware);

mongoose
  .connect(
    "mongodb+srv://Hazem:admin123_Hazem@hazemapi.a0fawvi.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Node ApI is Running on Port ${PORT}`);
    });
    console.log("Connected To MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
