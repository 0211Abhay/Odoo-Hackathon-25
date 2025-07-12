const { DataTypes } = require("sequelize");

/**
 * Defines the 'UserSkills' model representing the many-to-many relationship
 * between users and skills.
 *
 * @param {Sequelize} sequelize - The Sequelize instance for the database connection
 * @returns {Model} - The Sequelize model for 'user_skills'
 */
module.exports = function model(sequelize) {
  // Define the attributes/columns of the 'user_skills' table
  const attributes = {
    /**
     * Foreign key referencing the 'Users' table.
     * Combined with 'skill_id' to form a composite primary key.
     */
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },

    /**
     * Foreign key referencing the 'Skills' table.
     * Combined with 'user_id' to form a composite primary key.
     */
    skill_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  };

  // Model options
  const options = {
    tableName: "user_skills", // Explicit table name
    timestamps: false, // Disable automatic createdAt/updatedAt fields
  };

  // Return the defined model
  return sequelize.define("UserSkills", attributes, options);
};
