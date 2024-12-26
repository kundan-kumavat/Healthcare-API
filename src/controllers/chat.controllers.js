const Chat = require('../models/chat.models.js');

const uploadChat = async (req, res) => {
    const { input, output } = req.body;

    if(!input && !output){
        return res.status(400).json({message: "Incomplete chat data"});
    }

    try {
        const chat = await Chat.create({
            user_input: input,
            output,
            user: req.user?._id
        });

        return res.status(201).json({
            message: "Chat uploaded",
            data: chat
        });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "chat not uploaded",
        });
    }
}

const getChats = async(req, res) => {
    try {
        const chats = await Chat.find({
            user: req.user?._id,
        });

        if(!chats){
            return res.status(404).json({message: 'Chats not found'})
        }
    
        return res.status(200).json({
            data: chats
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "chat data not fetched",
        });
    }
}

const updateChat = async(req, res) => {
    const chatId = req.params.id;
    const {input, output} = req.body;

    if(!input && !output){
        return res.status(400).json({message: "Incomplete chat data"});
    }

    try {
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $set: {
                    user_input: input,
                    output: output
                }
            },
            {
                new: true
            }
        );
    
        return res.status(200).json({
            message: "chat updated successfully",
            data: chat
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "chat not updated",
        });
    }
}

const deleteChat = async(req, res) => {
    const chatId = req.params.id;
    try {
        await Chat.findByIdAndDelete(chatId);
    
        return res.status(200).json({
            message: 'chat deleted successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "chat data not deleted",
        });
    }
}

module.exports = {uploadChat, getChats, deleteChat, updateChat}