const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
        },
        phone_no: {
            type: String,
            required: true
        },
        Gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: true
        },
        working_hours: {
            type: Number,
            default: 0
        },
        height: {
            type: String,
        },
        weight: {
            type: String,
        },
        address: {
            type: String,
        },
        address_2: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        pincode: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Personal_Data', personalInfoSchema)