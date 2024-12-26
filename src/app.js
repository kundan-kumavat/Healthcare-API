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

const userRouter = require('./routes/user.routes.js');
const chatRouter = require('./routes/chat.routes.js');
const appointmentRouter = require('./routes/appointment.routes.js');
const medicalDataRouter = require('./routes/medicalData.routes.js');
const doctorRouter = require('./routes/doctor.routes.js');

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/appointments", appointmentRouter);
app.use("/api/v1/medical-data", medicalDataRouter);
app.use("/api/v1/doctors", doctorRouter);

module.exports = {app};