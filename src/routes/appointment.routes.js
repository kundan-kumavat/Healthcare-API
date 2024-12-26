const { Router } = require('express');
const verifyJWT = require('../middlewares/auth.middlewares.js');
const { addAppointment, getAppointments, updateAppointment, deleteAppointment } = require('../controllers/appointment.controllers.js');

const router = Router();

router.route('/').get(verifyJWT, getAppointments);
router.route('/').post(verifyJWT, addAppointment);
router.route('/:id').put(verifyJWT, updateAppointment);
router.route('/:id').delete(verifyJWT, deleteAppointment);

module.exports = router;