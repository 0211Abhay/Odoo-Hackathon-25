const { DataTypes } = require("sequelize");

/**
 * Defines the 'PlatformMessage' model for storing messages posted on the platform.
 *
 * @param {Sequelize} sequelize - The Sequelize instance used to define the model.
 * @returns {Model} - A Sequelize model representing a row in the 'platform_messages' table.
 */
module.exports = function model(sequelize) {
  // Attributes definition
  const attributes = {
    /**
     * Primary key for each message.
     * Auto-incremented integer value.
     */
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    /**
     * Title of the message (optional).
     * Stored as a variable-length string.
     */
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    /**
     * The full content of the message.
     * Stored as text to allow long messages.
     */
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    /**
     * Timestamp indicating when the message was posted.
     * Defaults to the current date and time.
     */
    posted_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  };

  // Model options
  const options = {
    tableName: "platform_messages", // Custom table name in the database
    timestamps: false, // Disables Sequelize's createdAt and updatedAt fields
  };

  // Define and return the model
  return sequelize.define("PlatformMessage", attributes, options);
};
