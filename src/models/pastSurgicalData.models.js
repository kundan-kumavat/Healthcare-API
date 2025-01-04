const mongoose = require('mongoose');

const pastSurgicalHistorySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        complications: [
            {
                type: String
            }
        ],
        anstesia_history: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Past_Surgical_Data', pastSurgicalHistorySchema);