const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cors = require("cors");

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);


app.listen(process.env.PORT || 5001, () => {
    console.log("Backend server is running!");
});

