const User = require('../models/user.models');
const { uploadOnCloudinary } = require('../utils/cloudinary');

const generateAccessToken = async(userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();

        return accessToken;
    } catch (error) {
        return res.status(500).json({message: "Something went wrong while generating access token"});
    }
}

const registerUser = async(req, res) => {

    const { username, email, password } = req.body;

    if([email, username, password].some((field) => field?.trim() === "")){
        res.status(400).json({message: "All fields are required"});
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    });

    if(existedUser){
        res.status(409).json({message: "user already exits"});
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // console.log(avatarLocalPath);
    if(!avatarLocalPath){
        return res.status(400).json({message: "Avatar image is required"});
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if(!avatar){
        return res.status(400).json({message: "Error occured while uploading on the avatar"})
    }
    
    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser) {
        return res.status(500).json({message: "Something went wrong while creating the user"})
    }

    return res.status(201).json(createdUser);
}

const loginUser = async (req, res) => {
    const {email, username, password} = req.body;

    if(!username && !email){
        return res.status(400).json({message: "email or username is required"});
    }

    const user = await User.findOne({
        $or: [{username}, {email}],
    });

    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        return res.status(400).json({message: "Invalid credentails"});
    }

    const accessToken = await generateAccessToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password")

    return res.status(200).json({user: loggedInUser, token: accessToken});
};

module.exports = {registerUser, loginUser}