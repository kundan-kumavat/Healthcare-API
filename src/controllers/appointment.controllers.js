const Appointment = require('../models/appointment.models.js');

const addAppointment = async (req, res) => {
    const { doctor, date, timeSlot } = req.body;

    if([doctor, date, timeSlot].some((feild) => feild?.trim() === "")){
        return res.status(400).json({message: "Incomplete Appointment data"});
    }

    try {
        const Appointment = await Appointment.create({
            doctor: doctor,
            timeSlot,
            date,
            user: req.user?._id
        });

        return res.status(201).json({
            message: "Appointment addded",
            data: Appointment
        });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Appointment not addded",
        });
    }
}

const getAppointments = async(req, res) => {
    try {
        const Appointments = await Appointment.find({
            user: req.user?._id,
        });

        if(!Appointments){
            return res.status(404).json({
                message: "No appointment found"
            })
        }
    
        return res.status(200).json({
            data: Appointments
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Data not fetched",
        });
    }
}

const updateAppointment = async(req, res) => {
    const AppointmentId  = req.params.id;
    // const {doctor, date, timeSlot} = req.body;

    const updateData = req.body;

    if(!Object.keys(updateData)?.length){
        return res.status(400).json({
            message: "No fields to update"
        });
    }

    

    try {
        const Appointment = await Appointment.findByIdAndUpdate(
            AppointmentId,
            {
                $set: updateData
            },
            {
                new: true
            }
        );
    
        return res.status(200).json({
            message: "Appointment updated successfully",
            data: Appointment
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Appointment not updated",
        });
    }
}

const deleteAppointment = async(req, res) => {
    const AppointmentId = req.params.id;
    try {
        await Appointment.findByIdAndDelete(AppointmentId);
    
        return res.status(200).json({
            message: 'Appointment deleted successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Appointment not deleted",
        });
    }
}

module.exports = { addAppointment, getAppointments, deleteAppointment, updateAppointment}