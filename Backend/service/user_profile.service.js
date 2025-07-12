const bcrypt = require("bcryptjs");
const model = require("../helper/db.helper");
const { Op } = require("sequelize");
const Credentials = model.credentials;
const UserProfile = model.user_profile;
const PasswordReset = require("../model/password_reset.model");
const randomString = require("randomstring");
const sendMail = require("../helper/send_mail");

class UserService {
  async createUserWithProfile(userData, filename = "") {
    const existingUser = await Credentials.findOne({
      where: { email: userData.email.toLowerCase() },
    });

    if (existingUser) {
      throw new Error("Email Already Exists");
    }

    const hash = await bcrypt.hash(userData.password, 10);
    const randomToken = randomString.generate();

    const credentials = await Credentials.create({
      username: userData.username,
      email: userData.email.toLowerCase(),
      password_hash: hash,
      role: userData.role || "user",
      status: "active",
      token: randomToken,
    });

    await UserProfile.create({
      user_id: credentials.user_id,
      full_name: userData.username,
      location: userData.district,
      profile_photo_url: filename ? "images/" + filename : null,
      github_url: userData.github_url || null,
      linkedin_id: userData.linkedin_id || null,
    });

    const mailSubject = "Verification Email From Skill Swap";
    const content = `<p>Hello ${userData.name}, Please <a href="http://127.0.0.1:3000/mail_verification?token=${randomToken}">Verify</a> your email address.</p>`;
    await sendMail(userData.email, mailSubject, content);

    return credentials;
  }

  async createUserExcel(userData) {
    return this.createUserWithProfile(userData);
  }

  async verifyUserEmail(token) {
    const user = await Credentials.findOne({ where: { token } });
    if (!user) {
      throw new Error("Invalid token");
    }
    await user.update({ token: null });
    return user;
  }

  async loginUser(email, password) {
    const user = await Credentials.findOne({ where: { email } });
    if (!user) {
      throw new Error("Email or Password is incorrect");
    }
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error("Email or Password is incorrect");
    }
    return user;
  }

  async getUserProfileById(userId) {
    const credentials = await Credentials.findByPk(userId, {
      include: UserProfile,
    });
    if (!credentials) {
      throw new Error("User not found");
    }
    return credentials;
  }

  async initiatePasswordReset(email) {
    const user = await Credentials.findOne({ where: { email } });
    if (!user) {
      throw new Error("Email Not Found");
    }

    const randomToken = randomString.generate();
    const mailSubject = "Reset Password Email From Skill Swap";
    const content = `<p>Hello ${user.username}, <p>You have requested a password reset. <p>Please click the link below to reset your password: <a href="http://127.0.0.1:3000/reset-password?token=${randomToken}">Reset Password</a>`;

    await sendMail(user.email, mailSubject, content);
    await PasswordReset.destroy({ where: { email: user.email } });
    await PasswordReset.create({ email: user.email, token: randomToken });

    return true;
  }

  async verifyResetToken(token) {
    const passwordReset = await PasswordReset.findOne({ where: { token } });
    if (!passwordReset) {
      throw new Error("Invalid token");
    }
    const user = await Credentials.findOne({ where: { email: passwordReset.email } });
    if (!user) {
      throw new Error("User not found");
    }
    return { user, token };
  }

  async resetUserPassword(userId, email, password) {
    const hash = await bcrypt.hash(password, 10);
    await PasswordReset.destroy({ where: { email } });
    await Credentials.update({ password_hash: hash }, { where: { user_id: userId } });
  }

  async updateUserProfile(userId, updateData) {
    await UserProfile.update(updateData, { where: { user_id: userId } });
  }

  async deleteUserById(userId) {
    await UserProfile.destroy({ where: { user_id: userId } });
    await Credentials.destroy({ where: { user_id: userId } });
  }
}

module.exports = new UserService();
