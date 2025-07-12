const { DataTypes } = require("sequelize");

module.exports = function model(sequelize) {
    const attributes = {
        request_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        requester_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        receiver_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        skill_offered_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'skills',
                key: 'skill_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        skill_requested_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'skills',
                key: 'skill_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        msg: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("Pending", "Accepted", "Rejected", "Cancelled"),
            defaultValue: "Pending",
        },
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
