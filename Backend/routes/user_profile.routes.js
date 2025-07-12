const express = require('express');
const router = express.Router();
const { signUpValidation, loginValidation, forgotValidation, updateProfileValidation } = require('../helper/validation');
const userController = require("../controller/user_profile.controller");
const path = require('path');
const multer = require('multer');
const auth = require("../middleware/auth")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function(req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: filefilter,
});


router.post("/register", upload.single('image'), signUpValidation, userController.register);
router.post("/login", loginValidation, userController.login);
router.get('/get-token', userController.getSessionData);
router.get('/get-user', auth.isAuthorize, userController.getUser);
router.post('/forgot-password', forgotValidation, userController.forgotPassword);
router.put('/update_profile', upload.single('image'), updateProfileValidation, auth.isAuthorize, userController.updateProfile);
router.post('/logout', userController.logout);
router.delete('/delete_profile', auth.isAuthorize, userController.deleteProfile);

// Skills endpoints for profile editing
router.get('/user/skills', auth.isAuthorize, userController.getUserSkills);
router.put('/user/skills', auth.isAuthorize, userController.updateUserSkills);
router.get('/skills', userController.getAllSkills);

module.exports = router;