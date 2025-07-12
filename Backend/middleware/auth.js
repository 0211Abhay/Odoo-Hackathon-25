const router = require("express").Router();
// const passport = require("passport");
// const { login } = require("../controller/user.controller");

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.redirect("http://localhost:5173/empdashboard");
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "login in failure",
    })
})

// router.get("/google", passport.authenticate('google', {
//     scope: ['email', 'profile']
// }))

// router.get("/google/callback",
//     passport.authenticate("google", {
//         successRedirect: process.env.CLIENT_URL,
//         failureRedirect: "/login/failed",
//     })
// )

// router.get("/logout", (req, res) => {
//     req.logout();
//     res.redirect(process.env.CLIENT_URL);
// })

const isAuthorize = async(req, res, next) => {
    try {
        if (!req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(422).json({
                message: 'Please Provide a Valid Token'
            });
        }

        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            message: error.message
        });
    }
}

module.exports = {
    isAuthorize,
    router
}