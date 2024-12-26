const mongoose = require('mongoose');

const addicationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        frequency: {
            type: Number,
            default: 0,
            required: true
        },
        durationInMonths: {
            type: Number,
            default: 0,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
    ,{
      timestamps: true
    }
);

module.exports = mongoose.model('Addication', addicationSchema);