const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bookRoutes = require('./routes/bookRoutes')
const cors = require('cors');
require("dotenv").config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGOURL).then(() => {
    console.log("connected to DB");
}).catch((er) => {
    console.log(er);
})

app.listen(process.env.PORT , (er) => {
    if (er) {
        console.log(er);
    }
    else {
        console.log("connected on port " , process.env.PORT)
    }
})
app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("hey I'm working");
})
app.use("/books", bookRoutes);