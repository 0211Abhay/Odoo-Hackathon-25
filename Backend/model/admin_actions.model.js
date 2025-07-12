const { DataTypes } = require("sequelize");

// Exporting the model definition function
module.exports = function model(sequelize) {
  /**
   * Defines the 'AdminAction' model with attributes representing administrative actions
   * taken by an admin user on the platform.
   *
   * @param {Sequelize} sequelize - The Sequelize instance used for defining the model
   * @returns {Model} - The Sequelize model representing the 'admin_actions' table
   */
  const attributes = {
    /**
     * Primary key for the admin action.
     */
    action_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    /**
     * ID of the admin user who performed the action.
     */
    admin_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    /**
     * ID of the user on whom the action was performed.
     */
    target_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    /**
     * Type of action performed by the admin.
     * Allowed values:
     *  - 'Reject Description'
     *  - 'Ban User'
     *  - 'Monitor Swap'
     *  - 'Message'
     */
    action_type: {
      type: DataTypes.ENUM(
        "Reject Description",
        "Ban User",
        "Monitor Swap",
        "Message"
      ),
      allowNull: true,
    },

    /**
     * Optional description or details about the action.
     */
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    /**
     * Timestamp when the action was performed.
     * Defaults to the current date and time.
     */
    action_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  };

  const options = {
    tableName: "admin_actions", // Explicit table name in the database
    timestamps: false, // Disables automatic createdAt/updatedAt columns
  };

  // Return the defined model
  return sequelize.define("AdminAction", attributes, options);
};
