const { Router } = require('express');
const { registerUser, loginUser, logOut, changePassword, refreshAccessToken, userDetails, deleteUser, updateUserDetails, getCurrentUserDetail, updateUserAvatar } = require('../controllers/user.controllers.js');
const { upload } = require('../middlewares/multer.middlewares.js');
const verifyJWT = require('../middlewares/auth.middlewares.js');
const { getUserStats } = require('../controllers/dashboard.controllers.js')

const router = Router();

router.route('/register').post(
    registerUser
);

router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logOut);
router.route('/change-password').post(verifyJWT, changePassword);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/user-details').post(verifyJWT,
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1
        }
    ]),
    userDetails
);

router.route('/delete-user').delete(verifyJWT, deleteUser);
router.route('/update-avatar').put(verifyJWT, upload.single('avatar'), updateUserAvatar);
router.route('/user-details').put(verifyJWT, updateUserDetails);
router.route('/current-user').get(verifyJWT, getCurrentUserDetail);
router.route('/stats/:username').get(verifyJWT, getUserStats);

module.exports = router;