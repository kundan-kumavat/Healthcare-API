const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        user_input: {
            type: String,
            required: true
        },
        output: {
            type: String,
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
);

module.exports = mongoose.model('Chat', chatSchema)