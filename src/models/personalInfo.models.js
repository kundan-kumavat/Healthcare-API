const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        dob: {
            type: String,
            required: true
        },
        phone_no: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: true
        },
        working_hours: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        address: {
            type: String,
            required: true
        },
        address_2: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Personal_Data', personalInfoSchema)