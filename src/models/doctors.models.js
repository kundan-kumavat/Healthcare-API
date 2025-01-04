const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        specialization: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        fees: {
            type: Number
        },
        experienceInYears: {
            type: Number,
            default: 0,
            required: true
        },
        worksInHospitals: [{
            type: String,
            required: true
        }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Doctor', doctorSchema);