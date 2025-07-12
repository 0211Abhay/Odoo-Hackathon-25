const { DataTypes } = require("sequelize");

// Exporting the model definition function
module.exports = function model(sequelize) {
  /**
   * Defines the 'BannedUser' model representing users who have been banned.
   *
   * @param {Sequelize} sequelize - The Sequelize instance for the database connection
   * @returns {Model} The Sequelize model for 'BannedUser'
   */

  // Defining model attributes
  const attributes = {
    /**
     * The ID of the user who has been banned.
     * Serves as the primary key.
     */
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    /**
     * The ID of the admin or user who issued the ban.
     */
    banned_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    /**
     * Reason for banning the user.
     */
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    /**
     * Timestamp when the user was banned.
     * Defaults to the current timestamp.
     */
    banned_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  };

  // Model configuration options
  const options = {
    tableName: "banned_users", // Explicit table name
    timestamps: false, // Disable Sequelize's automatic timestamps
  };

  // Returning the model definition
  return sequelize.define("BannedUser", attributes, options);
};
