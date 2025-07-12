const { DataTypes } = require("sequelize");

/**
 * Defines the 'UserProfile' model representing a user's profile details.
 *
 * @param {Sequelize} sequelize - The Sequelize instance connected to the database
 * @returns {Model} - A Sequelize model representing the 'user_profile' table
 */
module.exports = function model(sequelize) {
  // Define attributes/columns for the user_profile table
  const attributes = {
    /**
     * Unique identifier for the user (Primary Key)
     */
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    /**
     * Full name of the user
     */
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    /**
     * Location of the user (optional)
     */
    location: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    /**
     * URL to the user's profile photo (optional)
     */
    profile_photo_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    /**
     * User's availability preference
     * Options: 'Weekends', 'Evenings', 'Anytime'
     */
    availability: {
      type: DataTypes.ENUM("Weekends", "Evenings", "Anytime"),
      allowNull: true,
    },

    /**
     * Indicates whether the user's profile is public
     */
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    /**
     * GitHub profile URL of the user (optional)
     */
    github_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    /**
     * LinkedIn identifier or profile link of the user (optional)
     */
    linkedin_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };

  // Define options for the model
  const options = {
    tableName: "user_profile",
    timestamps: false, // Disable createdAt and updatedAt columns
  };

  // Define and return the model
  return sequelize.define("UserProfile", attributes, options);
};
