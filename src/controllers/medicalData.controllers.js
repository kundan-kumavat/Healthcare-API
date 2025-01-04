const PastSurgicalData = require('../models/pastSurgicalData.models.js');
const Addication = require('../models/addication.models.js');
const CurrentMedicationData = require('../models/currentMedication.models.js');

const getPastSurgicalData = async(req, res) => {
    try {
        const PastSurgicalDatas = await PastSurgicalData.find({
            user: req.user?._id,
        });

        if(!PastSurgicalDatas){
            return res.status(404).json({
                message: "No Past Surgical Data found"
            })
        }
    
        return res.status(200).json({
            data: PastSurgicalDatas
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Data not fetched",
        });
    }
}

const addPastSurgicalData = async(req, res) => {
    const { name, date, complications, anstesia_history } = req.body;

    if(!name && !date){
        return res.status(400).json({
            message: 'Surgery details are required'
        });
    }

    try {
        const data = await PastSurgicalData.create({
            name,
            date,
            complications,
            anstesia_history,
            user: req.user?._id
        });

        const savedData = await PastSurgicalData.findById(data._id);

        return res.status(201).json({
            message: "Past Surgical Data saved successfully",
            data: savedData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while saving the surgical data",
        });
    }
};

const deletePastSurgicalData = async(req, res) => {
    const dataId = req.params.id;
    try {
        await PastSurgicalData.findByIdAndDelete(dataId);
    
        return res.status(200).json({
            message: 'Past Surgical data deleted successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Past Surgical data not deleted",
        });
    }
}

const updatePastSurgicalData = async(req, res) => {
    const dataId  = req.params.id;

    const updateData = req.body;

    if(!Object.keys(updateData)?.length){
        return res.status(400).json({
            message: "No fields to update"
        });
    }

    

    try {
        const pastSurgicalData = await PastSurgicalData.findByIdAndUpdate(
            dataId,
            {
                $set: updateData
            },
            {
                new: true
            }
        );
    
        return res.status(200).json({
            message: "Past Surgical Data updated successfully",
            data: pastSurgicalData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Past Surgical Data not updated",
        });
    }
}

const getAddicationData = async(req, res) => {
    try {
        const Addications = await Addication.find({
            user: req.user?._id,
        });

        if(!Addications){
            return res.status(404).json({
                message: "No Addication found"
            })
        }
    
        return res.status(200).json({
            data: Addications
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Data not fetched",
        });
    }
}

const addAddicationData = async(req, res) => {
    const { name, frequency, durationInMonths } = req.body;

    if ([name, frequency, durationInMonths].some((field) => 
        typeof field === 'string' ? field.trim() === '' : field == null
    )) {
        return res.status(400).json({
            message: "Required fields are missing or invalid: name, frequency, durationInMonths",
        });
    }

    try {
        const Data = await Addication.create({
            name,
            frequency,
            durationInMonths,
            user: req.user?._id
        });

        return res.status(201).json({
            message: "Addication data saved successfully",
            data: Data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while saving the addication data",
        });
    }
};

const deleteAddicationData = async(req, res) => {
    const dataId = req.params.id;
    try {
        await Addication.findByIdAndDelete( dataId );
    
        return res.status(200).json({
            message: 'Addication deleted successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Addication not deleted",
        });
    }
}

const updateAddicationData = async(req, res) => {
    const dataId  = req.params.id;

    const updateData = req.body;

    if(!Object.keys(updateData)?.length){
        return res.status(400).json({
            message: "No fields to update"
        });
    }

    

    try {
        const data = await Addication.findByIdAndUpdate(
            dataId,
            {
                $set: updateData
            },
            {
                new: true
            }
        );

        if(!data){
            return res.status(500).json({
                message: "Mongoose error while updating addication data"
            })
        }
    
        return res.status(200).json({
            message: "Addication Data updated successfully",
            data: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Addication Data not updated",
        });
    }
}

const getCurrentMedicationData = async(req, res) => {
    try {
        const CurrentMedicationDatas = await CurrentMedicationData.find({
            user: req.user?._id,
        });

        if(!CurrentMedicationDatas){
            return res.status(404).json({
                message: "No Current Medication Data found"
            })
        }
    
        return res.status(200).json({
            data: CurrentMedicationDatas
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Data not fetched",
        });
    }
}

const addCurrentMedicationData = async(req, res) => {
    const { name, medicines, medicine_duration, known_allergies } = req.body;

    if([ name, medicines, medicine_duration ].some((feild) => feild?.trim() === "")){
        return res.status(400).json({message: "Incomplete Medication data"});
    }

    try {

        const data = await CurrentMedicationData.create({
            name,
            medicines: medicines,
            medicine_duration: medicine_duration,
            known_allergies,
            user: req.user?._id
        });

        return res.status(201).json({
            message: "Current medication data added successfully",
            data: data
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Current medication not added",
        });
    }
    
};

const deleteCurrentMedicationData = async(req, res) => {
    const dataId = req.params.id;
    try {
        await CurrentMedicationData.findByIdAndDelete(dataId);
    
        return res.status(200).json({
            message: 'Current Medication Data deleted successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Current Medication Data not deleted",
        });
    }
}

const updateCurrentMedicationData = async(req, res) => {
    const dataId  = req.params.id;

    const updateData = req.body;

    if(!Object.keys(updateData)?.length){
        return res.status(400).json({
            message: "No fields to update"
        });
    }

    

    try {
        const currentMedication = await CurrentMedicationData.findByIdAndUpdate(
            dataId,
            {
                $set: updateData
            },
            {
                new: true
            }
        );
    
        return res.status(200).json({
            message: "Current Medication Data updated successfully",
            data: currentMedication
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Current Medication Data not updated",
        });
    }
}


module.exports = { 
    getAddicationData,
    getCurrentMedicationData,
    getPastSurgicalData,
    addAddicationData, 
    addCurrentMedicationData, 
    addPastSurgicalData,
    deleteAddicationData,
    deleteCurrentMedicationData,
    deletePastSurgicalData,
    updateAddicationData,
    updateCurrentMedicationData,
    updatePastSurgicalData
};