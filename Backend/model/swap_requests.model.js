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
         */
        requester_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        /**
         * ID of the user receiving the request.
         */
        receiver_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
         * Optional message with the swap request.
         */
        msg: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        /**
         * Current status of the swap request.
         */
        status: {
            type: DataTypes.ENUM("Pending", "Accepted", "Rejected", "Cancelled"),
            defaultValue: "Pending",
        },

        /**
         * Date when the request was made.
         */
        request_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    };

    const options = {
        tableName: "swap_requests",
        timestamps: false,
    };

    return sequelize.define("SwapRequest", attributes, options);
};