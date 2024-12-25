const User = require('../models/user.models.js');
const { uploadOnCloudinary } = require('../utils/cloudinary');
const jwt = require('jsonwebtoken');
const PersonalDetail = require('../models/personalInfo.models.js')

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        user.save({
            validateBeforeSave: false
        })

        return { accessToken, refreshToken };
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while generating access token" });
    }
}

const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    if ([email, username, password].some((field) => field?.trim() === "")) {
        res.status(400).json({ message: "All fields are required" });
    }

    try {

        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existedUser) {
            res.status(409).json({ message: "user already exits" });
        }

        const user = await User.create({
            username: username.toLowerCase(),
            email,
            password
        });

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong while creating the user" })
        }

        return res.status(201).json(createdUser);
    } catch (error) {
        console.log('Something went wrong while creating the user', error);
    }
}

const loginUser = async (req, res) => {
    const { email, username, password } = req.body;

    if (!username && !email) {
        return res.status(400).json({ message: "email or username is required" });
    }

    const user = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentails" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ user: loggedInUser, token: accessToken });
};

const logOut = async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json({ message: "User logged successfully" })
}

const changePassword = async(req, res) => {
    const {oldPassword, newPassword} = req.body;
    
    if(!oldPassword || !newPassword){
        return res.status(400).json({message: "Passwords are required"})
    }

    if(oldPassword === newPassword){
        return res.status(400).json({message: "old and new passsword should not be same"});
    }

    const user = await User.findById(req.user?._id);

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordValid){
        return res.status(400).json({message: "Invalid old password"})
    }

    user.password = newPassword
    await user.save({
        validateBeforeSave: false
    });

    return res.status(200).json({message: "Password changed successfully"})
}

const refreshAccessToken = async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        return res.status(401).json({message: "Unauthorozed access"})
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if(!user){
            return res.status(401).json({message: "Invalid access token"})
        }

        if(incomingRefreshToken !== req?.refreshToken){
            return res.status(401).json({message: "Refresh Token is expired"});
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken. options)
        .json({accessToken, refreshToken: refreshToken});

    } catch (error) {
        console.log(error)
    }
};

const userDetails = async(req, res) => {
    const {firstName, lastName, dob, phone_no, gender, working_hours, height, weight, address, address_2, city, state, pincode} = req.body;

    if([firstName, lastName, dob, phone_no, gender, address, pincode].some((field) => field?.trim() === '')){
        return res.status(400).json({message: "Required fileds are empty"});
    }

    try {
        const user = await User.findById(req.user?._id);

        const avatarLocalPath = req.files?.avatar[0]?.path;
        // console.log(avatarLocalPath);
        if (!avatarLocalPath) {
            return res.status(400).json({ message: "Avatar image is required" });
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (!avatar) {
            return res.status(400).json({ message: "Error occured while uploading on the avatar" })
        }

        const data = await PersonalDetail.create({
            firstName,
            lastName,
            dob,
            phone_no,
            gender,
            working_hours: working_hours || 0,
            height: height || "",
            weight: weight || "",
            address,
            address_2: address_2 || "",
            city: city || "",
            state: state || "",
            pincode,
            avatar: avatar.url,
            user: user._id
        });

        const savedData = await PersonalDetail.findById(data?._id);

        return res.status(201).json({message: "User details saved successfully",
            data: savedData
        })

    } catch (error) {
        console.log('something went wrong while creating the user: ', error);
    }
}

const updateUserDetails = async(req, res) => {
    const {firstName, lastName, dob, phone_no, gender, working_hours, height, weight, address, address_2, city, state, pincode} = req.body;

    try {

        const user = await PersonalDetail.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    firstName,
                    lastName,
                    dob,
                    phone_no,
                    gender,
                    working_hours,
                    height,
                    weight,
                    address,
                    address_2,
                    city,
                    state,
                    pincode
                }
            },
            {
                new: true
            }
        );

        return res.status(200).json({
            message: "Account Details updated successfully",
            user: user
        });
    } catch (error) {
        console.log("Something went wrong while updating results: ", error);
    }
};

const updateUserAvatar = async (req, res) => {
    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.url){
        throw new ApiError(400, "Error on uploading on avatar")
    }

    const user = await PersonalDetail.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res.status(200).json( 
        { message: "User profile updated successfully" }
    )
}

const getCurrentUserDetail = async(req, res) => {
    const userData = await PersonalDetail.findById(req.user?._id);
    return res.status(200).json({
        data: userData
    });
}

const deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.user?._id);

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.state(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({message: "user deleted successfully"});
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    logOut,
    changePassword,
    refreshAccessToken,
    userDetails,
    deleteUser,
    updateUserDetails,
    updateUserAvatar,
    getCurrentUserDetail
}