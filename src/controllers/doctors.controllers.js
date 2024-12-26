const Doctor = require('../models/doctors.models.js');

const addDoctor = async (req, res) => {
    const { name, specialization, location, fees, experienceInYears, worksInHospitals } = req.body;

    if([name, specialization, location, experienceInYears, worksInHospitals].some((feild) => feild?.trim() === "")){
        return res.status(400).json({message: "Incomplete Doctor data"});
    }

    try {
        const doctor = await Doctor.create({
            name: name,
            specialization: specialization,
            location: location,
            fees: fees,
            experienceInYears: experienceInYears,
            worksInHospitals: worksInHospitals
        });

        return res.status(201).json({
            message: "Doctor added",
            data: doctor
        });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Doctor not added",
        });
    }
}

const getDoctorsBasedOnLocation = async(req, res) => {
    const { location } = req.body || req.params;
    try {
        const doctors = await Doctor.find({
            location: location,
        });

        if(!doctors){
            return res.status(404).json({
                message: `No Doctor found for location: ${location}`
            })
        }
    
        return res.status(200).json({
            data: doctors
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while finding doctors based on location",
        });
    }
}

const getDoctorsBasedOnSpecialization = async(req, res) => {
    const { specialization } = req.body || req.params;
    try {
        const doctors = await Doctor.find({
            specialization: specialization,
        });

        if(!doctors){
            return res.status(404).json({
                message: `No Doctor found for specialization: ${specialization}`
            })
        }
    
        return res.status(200).json({
            data: doctors
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while finding doctors based on specialization",
        });
    }
}

const updateDoctorDetails = async(req, res) => {
    const doctorId = req.params.id;
    const { name, specialization, location, fees, experienceInYears, worksInHospitals } = req.body;

    if([name, specialization, location, experienceInYears, worksInHospitals].some((feild) => feild?.trim() === "")){
        return res.status(400).json({message: "Incomplete Doctor data"});
    }

    try {
        const doctor = await Doctor.findByIdAndUpdate(
            doctorId,
            {
                $set: {
                   name: name,
                   specialization: specialization,
                   location: location,
                   fees: fees,
                   experienceInYears: experienceInYears,
                   worksInHospitals: worksInHospitals
                }
            },
            {
                new: true
            }
        );
    
        return res.status(200).json({
            message: "Doctor details updated successfully",
            data: doctor
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Docotor details not updated",
        });
    }
}

const deleteDoctorDetails = async(req, res) => {
    const doctorId = req.params.id;
    try {
        await Doctor.findByIdAndDelete(doctorId);
    
        return res.status(200).json({
            message: 'doctor deatils deleted successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "doctor data not deleted",
        });
    }
}

module.exports = {
    addDoctor, 
    getDoctorsBasedOnLocation, 
    getDoctorsBasedOnSpecialization, 
    updateDoctorDetails, 
    deleteDoctorDetails
}