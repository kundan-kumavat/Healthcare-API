const { Router } = require('express');
const { registerUser, loginUser } = require('../controllers/user.controllers.js');
const { upload } = require('../middlewares/multer.middlewares.js');

const router = Router();

router.route('/register').post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1
        }
    ]),
    registerUser
);

router.route('/login').post(loginUser);

module.exports = router;