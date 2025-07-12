const { DataTypes } = require("sequelize");

/**
 * Defines the 'SwapRequest' model representing a skill swap request between users.
 *
 * @param {Sequelize} sequelize - The Sequelize instance for the database connection
 * @returns {Model} The Sequelize model for 'swap_requests'
 */
module.exports = function model(sequelize) {
    const attributes = {
        /**
         * Primary key for the swap request.
         * Auto-incremented unique ID.
         */
        request_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        /**
         * ID of the user who initiated the request.
         * References the user offering a skill.
         */
        requester_id: {
            type: DataTypes.INTEGER,
            allowNull: true, // can be changed to false if required
        },

        /**
         * ID of the user receiving the request.
         * References the user whose skill is being requested.
         */
        receiver_id: {
            type: DataTypes.INTEGER,
            allowNull: true, // can be changed to false if required
        },

        /**
         * ID of the skill being offered by the requester.
         */
        skill_offered_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        /**
         * ID of the skill being requested from the receiver.
         */
        skill_requested_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        /**
         * Current status of the swap request.
         * Can be one of: 'Pending', 'Accepted', 'Rejected', 'Cancelled'.
         * Defaults to 'Pending'.
         */
        status: {
            type: DataTypes.ENUM("Pending", "Accepted", "Rejected", "Cancelled"),
            defaultValue: "Pending",
        },

        /**
         * Date when the request was made.
         * Automatically set to the current timestamp.
         */
        request_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    };

    const options = {
        tableName: "swap_requests", // Name of the table in the database
        timestamps: false, // Disables createdAt and updatedAt fields
    };

    return sequelize.define("SwapRequest", attributes, options);
};