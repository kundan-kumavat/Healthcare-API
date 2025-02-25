const { Router } = require('express');
const verifyJWT = require('../middlewares/auth.middlewares.js');
const { addDoctor, getDoctorsBasedOnLocation, getDoctorsBasedOnSpecialization, updateDoctorDetails, deleteDoctorDetails } = require('../controllers/doctors.controllers.js');

const router = Router();

router.route('/').get(getDoctorsBasedOnLocation);
router.route('/').get(getDoctorsBasedOnSpecialization);
router.route('/').post(verifyJWT, addDoctor);
router.route('/:id').put(verifyJWT, updateDoctorDetails);
router.route('/:id').delete(verifyJWT, deleteDoctorDetails);

module.exports = router;