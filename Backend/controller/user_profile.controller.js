const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const userService = require("../service/user_profile.service");
const path = require("path");
const fs = require("fs");
const model = require("../helper/db.helper");
const UserSkills = model.user_skills;
const UserWantedSkills = model.user_wanted_skills;
const Skills = model.skills;

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
  
      // Set token as a cookie
      res.cookie("token", token, {
        httpOnly: true,        // Prevents client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Use only in HTTPS in production
        sameSite: "Strict",    // Prevents CSRF
        maxAge: 60 * 60 * 1000 // 1 hour
      });
  
      // Optionally still save in session
      req.session.token = token;
  
      return res.status(200).json({
        message: "Login Successfully",
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

/**
 * Get the current user's offered and wanted skills
 */
const getUserSkills = async (req, res) => {
  try {
    const authtoken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(authtoken, JWT_SECRET);
    const user_id = decoded.id;

    // Offered skills
    const offered = await UserSkills.findAll({
      where: { user_id },
      include: [{ model: Skills, attributes: ["skill_id", "skill_name", "tag"] }],
    });
    // Wanted skills
    const wanted = await UserWantedSkills.findAll({
      where: { user_id },
      include: [{ model: Skills, attributes: ["skill_id", "skill_name", "tag"] }],
    });
    res.status(200).json({
      offeredSkills: offered.map((s) => s.Skill),
      wantedSkills: wanted.map((s) => s.Skill),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Update the current user's offered and wanted skills
 * Expects: { offeredSkills: [skill_id], wantedSkills: [skill_id] }
 */
const updateUserSkills = async (req, res) => {
  try {
    const authtoken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(authtoken, JWT_SECRET);
    const user_id = decoded.id;
    const { offeredSkills, wantedSkills } = req.body;

    // Remove all current skills
    await UserSkills.destroy({ where: { user_id } });
    await UserWantedSkills.destroy({ where: { user_id } });
    // Add new offered skills
    if (Array.isArray(offeredSkills)) {
      await UserSkills.bulkCreate(
        offeredSkills.map((skill_id) => ({ user_id, skill_id }))
      );
    }
    // Add new wanted skills
    if (Array.isArray(wantedSkills)) {
      await UserWantedSkills.bulkCreate(
        wantedSkills.map((skill_id) => ({ user_id, skill_id }))
      );
    }
    res.status(200).json({ message: "Skills updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get all available skills
 */
const getAllSkills = async (req, res) => {
  console.log('[getAllSkills] Called');
  try {
    console.log('[getAllSkills] Fetching skills from DB...');
    const skills = await Skills.findAll({ attributes: ["skill_id", "skill_name", "tag"] });
    console.log(`[getAllSkills] Fetched ${skills.length} skills:`, skills.map(s => s.dataValues));
    res.status(200).json(skills);
    console.log('[getAllSkills] Response sent successfully');
  } catch (error) {
    console.error('[getAllSkills] Error:', error);
    res.status(400).json({ message: error.message });
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
  getUserSkills,
  updateUserSkills,
  getAllSkills,
};
