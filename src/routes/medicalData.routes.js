const { Router } = require('express');
const verifyJWT = require('../middlewares/auth.middlewares.js');
const { getAddicationData, addAddicationData, deleteAddicationData, getCurrentMedicationData, addCurrentMedicationData, deleteCurrentMedicationData, getPastSurgicalData, addPastSurgicalData, deletePastSurgicalData, updateAddicationData, updateCurrentMedicationData, updatePastSurgicalData } = require('../controllers/medicalData.controllers.js');

const router = Router();

router.route('/addication').get(verifyJWT, getAddicationData);
router.route('/current-medication-data').get(verifyJWT, getCurrentMedicationData);
router.route('/past-surgical-data').get(verifyJWT, getPastSurgicalData);


router.route('/addication').post(verifyJWT, addAddicationData);
router.route('/current-medication-data').post(verifyJWT, addCurrentMedicationData);
router.route('/past-surgical-data').post(verifyJWT, addPastSurgicalData);


router.route('/addication/:id').delete(verifyJWT, deleteAddicationData);
router.route('/current-medication-data/:id').delete(verifyJWT, deleteCurrentMedicationData);
router.route('/past-surgical-data/:id').delete(verifyJWT, deletePastSurgicalData);

router.route('/addication/:id').put(verifyJWT, updateAddicationData);
router.route('/current-medication-data/:id').put(verifyJWT, updateCurrentMedicationData);
router.route('/past-surgical-data/:id').put(verifyJWT, updatePastSurgicalData);

module.exports = router;