const { DataTypes } = require("sequelize");

/**
 * Defines the 'SwapFeedback' model representing feedback exchanged during a skill swap.
 *
 * @param {Sequelize} sequelize - The Sequelize instance for database connection.
 * @returns {Model} The Sequelize model for 'swap_feedback'.
 */
module.exports = function model(sequelize) {
  // Model attributes definition
  const attributes = {
    /**
     * Primary key for feedback entry.
     * Auto-incremented integer value.
     */
    feedback_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    /**
     * Foreign key referencing the request associated with the feedback.
     */
    request_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    /**
     * ID of the user who is giving the feedback.
     */
    from_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    /**
     * ID of the user receiving the feedback.
     */
    to_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    /**
     * Rating given in the feedback (between 1 and 5).
     */
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },

    /**
     * Textual content of the feedback.
     */
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    /**
     * Date when the feedback was given.
     * Defaults to current timestamp.
     */
    feedback_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
  };

  // Model options definition
  const options = {
    tableName: "swap_feedback",
    timestamps: false, // Disables Sequelize's automatic timestamp fields (createdAt, updatedAt)
  };

  // Return the defined Sequelize model
  return sequelize.define("SwapFeedback", attributes, options);
};
