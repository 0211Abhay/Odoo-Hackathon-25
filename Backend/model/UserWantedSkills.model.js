const { DataTypes } = require("sequelize");

/**
 * Defines the 'UserWantedSkills' model representing the 'user_wanted_skills' table.
 * This is a join table in a many-to-many relationship between users and skills,
 * indicating which skills a user wants to learn.
 *
 * @param {Sequelize} sequelize - The Sequelize instance used for database connection.
 * @returns {Model} - The Sequelize model for 'user_wanted_skills'.
 */
module.exports = function model(sequelize) {
  const attributes = {
    /**
     * The ID of the user who wants the skill.
     * This is a composite primary key along with skill_id.
     */
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      comment: "Foreign key referencing the user who wants the skill",
    },

    /**
     * The ID of the skill the user wants to learn.
     * This is a composite primary key along with user_id.
     */
    skill_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      comment: "Foreign key referencing the desired skill",
    },
  };

  const options = {
    tableName: "user_wanted_skills", // Actual table name in the database
    timestamps: false, // Disable createdAt and updatedAt fields
    comment: "Join table mapping users to the skills they want to learn",
  };

  return sequelize.define("UserWantedSkills", attributes, options);
};
