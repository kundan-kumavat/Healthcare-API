const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        timeSlot: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Appointment', appointmentSchema)