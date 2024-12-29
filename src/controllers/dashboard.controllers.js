const User = require('../models/user.models.js');

const getUserStats = async(req, res) => {
    const { username } = req.params;

    if(!username?.trim()){
        return res.status(400).json({
            message: "Username is required",
        });
    }

    try {

        const stats = await User.aggregate([
            {
                $match: {
                    username: username?.toLowerCase(),
                }
            },
            {
                $lookup: {
                    from: "personalinfos",
                    localField: "_id",
                    foreignField: "user",
                    as: "personalInfo",
                    pipeline: [
                        {
                            $project: {
                                dob: 1,
                                height: 1,
                                weight: 1
                            }
                        },
                        {
                            $addFields: {
                                age: {
                                    $divide: [
                                        { $subtract: [new Date(), "$dob"] }, 
                                        1000 * 60 * 60 * 24 * 365 
                                    ]
                                },
                                bmi: {
                                    $divide: [
                                        "$weight",
                                        { $pow: [{ $divide: ["$height", 100] }, 2] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                height: 1,
                                weight: 1,
                                gender: 1,
                                age: 1,
                                username: 1,
                                bmi: 1
                            }
                        }
                    ]
                }
            }
        ]);

        if(!stats?.length){
            return res.stats(404).json({
                message: "User does not exits"
            })
        };

        return res.status(200).json({
            message: "Fetched Successfully",
            data: stats[0]
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while loading user stats"
        });
    }
};

module.exports = {
    getUserStats
}