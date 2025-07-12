const { DataTypes } = require("sequelize");

/**
 * Defines the 'Skill' model representing the 'skills' table in the database.
 *
 * @param {Sequelize} sequelize - The Sequelize instance used to define the model.
 * @returns {Model} - The Sequelize model for the 'skills' table.
 */
module.exports = function model(sequelize) {
  // Model attributes
  const attributes = {
    /**
     * Unique identifier for the skill.
     * Primary Key, auto-incremented.
     */
    skill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    /**
     * Name of the skill.
     * Must be unique and not null.
     */
    skill_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    /**
     * Tag of the skill.
     * Must be unique and not null.
     */
    tag: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  };

  // Model options
  const options = {
    tableName: "skills", // Name of the table in the database
    timestamps: false, // Disables createdAt and updatedAt fields
  };

  // Define and return the model
  return sequelize.define("Skill", attributes, options);
};
