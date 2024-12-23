const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json({
    limit: '16kb',
}))

app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true,
    limit: '16kb',
}));

const userRouter = require('./routes/user.routes.js')
app.use("/api/v1/users", userRouter);

module.exports = {app};