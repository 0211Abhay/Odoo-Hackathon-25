// Import required environment variables
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// Import Sequelize ORM
const { Sequelize } = require("sequelize");

// Exported DB object for models and Sequelize instance
module.exports = db = {};

// Initialize Sequelize and define models/relationships
initialize();

/**
 * Initializes the Sequelize ORM with all models and relationships.
 */
async function initialize() {
  // Create Sequelize instance for MySQL
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    logging: false, // Set to true for SQL debugging
  });

  // Import Models
  db.credentials = require("../model/credentials.model")(sequelize);
  db.user_profile = require("../model/user_profile.model")(sequelize);
  db.skills = require("../model/skills.model")(sequelize);
  db.user_skills = require("../model/user_skills.model")(sequelize);
  db.user_wanted_skills = require("../model/user_wanted_skills.model")(
    sequelize
  );
  db.swap_requests = require("../model/swap_requests.model")(sequelize);
  db.swap_feedback = require("../model/swap_feedback.model")(sequelize);
  db.admin_actions = require("../model/admin_actions.model")(sequelize);
  db.banned_users = require("../model/banned_users.model")(sequelize);
  db.platform_messages = require("../model/platform_messages.model")(sequelize); // standalone
  db.password_reset = require("../model/password_reset.model")(sequelize);

  // 🔗 Define Model Associations

  /** 1. One-to-One: credentials ↔ user_profile */
  db.credentials.hasOne(db.user_profile, { foreignKey: "user_id" });
  db.user_profile.belongsTo(db.credentials, { foreignKey: "user_id" });

  /** 2. Many-to-Many: credentials ↔ skills through user_skills */
  db.credentials.belongsToMany(db.skills, {
    through: db.user_skills,
    foreignKey: "user_id",
    otherKey: "skill_id",
  });

  db.skills.belongsToMany(db.credentials, {
    through: db.user_skills,
    foreignKey: "skill_id",
    otherKey: "user_id",
  });

  /** 3. Many-to-Many: credentials ↔ skills through user_wanted_skills */
  db.credentials.belongsToMany(db.skills, {
    through: db.user_wanted_skills,
    foreignKey: "user_id",
    otherKey: "skill_id",
    as: "WantedSkills",
  });

  db.skills.belongsToMany(db.credentials, {
    through: db.user_wanted_skills,
    foreignKey: "skill_id",
    otherKey: "user_id",
    as: "InterestedUsers",
  });

  /** 4. One-to-Many: credentials ↔ swap_requests (as requester and receiver) */
  db.credentials.hasMany(db.swap_requests, {
    foreignKey: "requester_id",
    as: "RequestsMade",
  });

  db.credentials.hasMany(db.swap_requests, {
    foreignKey: "receiver_id",
    as: "RequestsReceived",
  });

  db.swap_requests.belongsTo(db.credentials, {
    foreignKey: "requester_id",
    as: "Requester",
  });

  db.swap_requests.belongsTo(db.credentials, {
    foreignKey: "receiver_id",
    as: "Receiver",
  });

  /** 5. One-to-Many: skills ↔ swap_requests (as offered and requested skills) */
  db.skills.hasMany(db.swap_requests, {
    foreignKey: "skill_offered_id",
    as: "OfferedSwaps",
  });

  db.skills.hasMany(db.swap_requests, {
    foreignKey: "skill_requested_id",
    as: "RequestedSwaps",
  });

  db.swap_requests.belongsTo(db.skills, {
    foreignKey: "skill_offered_id",
    as: "OfferedSkill",
  });

  db.swap_requests.belongsTo(db.skills, {
    foreignKey: "skill_requested_id",
    as: "RequestedSkill",
  });

  /** 6. One-to-Many: credentials ↔ swap_feedback (from_user and to_user) */
  db.credentials.hasMany(db.swap_feedback, {
    foreignKey: "from_user_id",
    as: "FeedbackGiven",
  });

  db.credentials.hasMany(db.swap_feedback, {
    foreignKey: "to_user_id",
    as: "FeedbackReceived",
  });

  db.swap_feedback.belongsTo(db.credentials, {
    foreignKey: "from_user_id",
    as: "FromUser",
  });

  db.swap_feedback.belongsTo(db.credentials, {
    foreignKey: "to_user_id",
    as: "ToUser",
  });

  /** 7. One-to-Many: swap_requests ↔ swap_feedback */
  db.swap_requests.hasMany(db.swap_feedback, {
    foreignKey: "request_id",
  });

  db.swap_feedback.belongsTo(db.swap_requests, {
    foreignKey: "request_id",
  });

  /** 8. One-to-Many: credentials (admin) ↔ admin_actions */
  db.credentials.hasMany(db.admin_actions, {
    foreignKey: "admin_user_id",
    as: "AdminActions",
  });

  db.admin_actions.belongsTo(db.credentials, {
    foreignKey: "admin_user_id",
    as: "Admin",
  });

  /** 9. One-to-Many: credentials (user) ↔ admin_actions (targeted) */
  db.credentials.hasMany(db.admin_actions, {
    foreignKey: "target_user_id",
    as: "ActionsReceived",
  });

  db.admin_actions.belongsTo(db.credentials, {
    foreignKey: "target_user_id",
    as: "TargetUser",
  });

  /** 10. One-to-One: credentials ↔ banned_users */
  db.credentials.hasOne(db.banned_users, {
    foreignKey: "user_id",
  });

  db.banned_users.belongsTo(db.credentials, {
    foreignKey: "user_id",
  });

  /** 11. One-to-Many: credentials (admin) ↔ banned_users (banned_by) */
  db.credentials.hasMany(db.banned_users, {
    foreignKey: "banned_by",
    as: "UsersBanned",
  });

  db.banned_users.belongsTo(db.credentials, {
    foreignKey: "banned_by",
    as: "BanningAdmin",
  });

  // Sync models with database
  await sequelize
    .sync({ alter: true })
    .then(() => console.log("✅ MySQL Synced Successfully"))
    .catch((err) => console.error("❌ DB Sync Failed:", err));

  // 🔁 Export Sequelize instance
  db.sequelize = sequelize;
}
