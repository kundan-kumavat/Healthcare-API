const mongoose = require('mongoose');

const currentMedicationSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        medicines: [
            {
                type: String,
                required: true
            }
        ],
        medicine_duration: {
            type: Number,
            default: 0,
            required: true
        },
        known_allergies: [
            {
                type: String,
            }
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Current_Medication', currentMedicationSchema);