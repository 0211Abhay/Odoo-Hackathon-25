const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const userService = require("../service/user.service");
const path = require("path");
const fs = require("fs");

/**
 * Registers a new user and profile.
 */
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await userService.createUserWithProfile(req.body, req.file?.filename);
    return res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 * Verifies email from token.
 */
const verifyMail = async (req, res) => {
  try {
    await userService.verifyUserEmail(req.query.token);
    return res.render("mail_verification", {
      message: "Email Verified Successfully",
    });
  } catch (error) {
    return res.render("Not_Found");
  }
};

/**
 * Authenticates a user.
 */
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await userService.loginUser(req.body.email, req.body.password);
    const token = jwt.sign(
      { id: user.user_id, is_admin: user.is_admin },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    req.session.token = token;
    return res.status(200).json({
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

/**
 * Retrieves the logged-in user's profile.
 */
const getUser = async (req, res) => {
  try {
    const authtoken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(authtoken, JWT_SECRET);
    const user = await userService.getUserProfileById(decoded.id);

    return res.status(200).json({
      message: "User Fetched Successfully!",
      user,
      isAdmin: decoded.is_admin,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

/**
 * Sends password reset email.
 */
const forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await userService.initiatePasswordReset(req.body.email);
    return res.status(200).json({
      message: "Email Sent Successfully for Password Reset",
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

/**
 * Loads the reset password form from token.
 */
const resetPasswordLoad = async (req, res) => {
  try {
    if (!req.query.token) {
      return res.render("Not_Found");
    }

    const { user, token } = await userService.verifyResetToken(req.query.token);
    return res.render("reset_password", {
      user,
      token,
      message: "Reset Password",
      email: user.email,
    });
  } catch (error) {
    return res.render("Not_Found");
  }
};

/**
 * Updates password using reset token.
 */
const resetPassword = async (req, res) => {
  try {
    const { password, confirm_password, user_id, email } = req.body;

    if (!password || !confirm_password) {
      return res.status(400).json({ message: "Password and confirm password are required" });
    }

    if (password !== confirm_password) {
      return res.render("reset_password", {
        error_message: "Password is Not Matching",
        user: { id: user_id, email },
      });
    }

    await userService.resetUserPassword(user_id, email, confirm_password);
    return res.render("message", {
      message: "Password Reset Successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 * Updates user's profile including optional photo.
 */
const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const userData = req.body;

    const updateData = {
      full_name: userData.full_name,
      location: userData.location,
      availability: userData.availability,
      github_url: userData.github_url,
      linkedin_id: userData.linkedin_id,
    };

    if (req.file) {
      const oldPath = path.join(__dirname, "..", "public", userData.old_photo);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      updateData.profile_photo_url = "images/" + req.file.filename;
    }

    await userService.updateUserProfile(decoded.id, updateData);
    return res.status(200).json({ message: "Profile Updated Successfully" });
  } catch (error) {
    return res.status(400).json({ errors: error.message });
  }
};

/**
 * Returns current session token.
 */
const getSessionData = (req, res) => {
  if (req.session.token) {
    return res.status(200).json({ token: req.session.token });
  } else {
    return res.status(401).json({ message: "User not logged in" });
  }
};

/**
 * Logs out the current session.
 */
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Logged out successfully" });
  });
};

/**
 * Deletes user's profile and associated image.
 */
const deleteProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userService.getUserProfileById(decoded.id);

    if (user.profile_photo_url) {
      const oldPath = path.join(__dirname, "..", "public", user.profile_photo_url);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    await userService.deleteUserById(decoded.id);
    return res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to delete profile",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  verifyMail,
  login,
  getUser,
  forgotPassword,
  resetPasswordLoad,
  resetPassword,
  updateProfile,
  logout,
  deleteProfile,
  getSessionData,
};
