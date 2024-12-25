const { Router } = require('express');
const verifyJWT = require('../middlewares/auth.middlewares.js');
const { getChats, uploadChat, updateChat, deleteChat} = require('../controllers/chat.controllers.js');

const router = Router();

router.route('/').get(verifyJWT, getChats);
router.route('/').post(verifyJWT, uploadChat);
router.route('/:id').put(verifyJWT, updateChat);
router.route('/:id').delete(verifyJWT, deleteChat);

module.exports = router;