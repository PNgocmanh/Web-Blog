require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require('./routers/User');
const articleRoute = require('./routers/Article');
const commentRoute = require('./routers/Comment');
const groupRoute = require('./routers/Group');


const app = express();
const PORT = process.env.PORT || 5000;

const URL = process.env.DATABASE_CONNECTION ;
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ROUTE
app.use("/api", userRoute);
app.use("/api", articleRoute);
app.use("/api", commentRoute);
app.use("/api", groupRoute);

// http://localhost:5000/

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log('err', err);
});

