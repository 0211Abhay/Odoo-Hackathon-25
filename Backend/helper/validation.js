const { check } = require('express-validator');

exports.signUpValidation = [

    check('username', "Name Is Required").not().isEmpty(),
    check('email', "Please Enter Valid Email").isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', "Password Is Required").isLength({ min: 6 }),
    // check('image').custom((value, { req }) => {

    //     if (req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpg') {
    //         return true;
    //     } else {
    //         return false;
    //     }

    // }).withMessage('Please Upload an Image type PNG , JPG , JPEG'),
]

exports.loginValidation = [

    check('email', "Please Enter Valid Email").isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', "Password Is Required").isLength({ min: 6 }),
]

exports.forgotValidation = [

    check('email', "Please Enter Valid Email").isEmail().normalizeEmail({ gmail_remove_dots: true }),
]

exports.updateProfileValidation = [

    check('name', "Name Is Required").not().isEmpty(),
    check('email', "Please Enter Valid Email").isEmail().normalizeEmail({ gmail_remove_dots: true }),

]