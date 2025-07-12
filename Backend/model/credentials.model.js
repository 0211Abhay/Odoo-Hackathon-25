const { DataTypes } = require('sequelize');

// Exporting the model definition function
module.exports = model;

/**
 * Defines the 'User' model with the required attributes and their properties.
 * 
 * @param {Sequelize} sequelize - The Sequelize instance for database connection
 * @returns {Model} The Sequelize model for 'User'
 */
function model(sequelize) {
    const attributes = {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
            // unique constraint moved to indexes below
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
            // unique constraint moved to indexes below
        },
        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        joining_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user'
        },
        status: {
            type: DataTypes.ENUM('active', 'banned'),
            defaultValue: 'active'
        }
    };

    const options = {
        tableName: 'credentials',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['username']
            },
            {
                unique: true,
                fields: ['email']
            }
        ]
    };

    return sequelize.define("User", attributes, options);
}
