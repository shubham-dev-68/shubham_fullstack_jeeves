'use strict';

const errorMessages = require('../constants/error_messages');
const constants = require('../constants');

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Property extends Model {

        static associate(models) {
            // define association here
            // this.belongsTo(models.User, { foreignKey: "user_id" });
            // this.hasMany(models.View, { foreignKey: "property_id" });
            this.hasMany(models.Image, { foreignKey: "property_id" });
        }

        toJSON() {
            return {...this.get(), updatedAt: undefined, createdAt: undefined }
        }
    };
    Property.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: { msg: errorMessages.PROPERTY_NAME_REQUIRED },
                notEmpty: { msg: errorMessages.PROPERTY_NAME_NOT_EMPTY }
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Please specify address" },
                notEmpty: { msg: "Please specify address" }
            }
        },
        locality: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Please specify locality" },
                notEmpty: { msg: "Please specify locality" }
            }
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notNull: { msg: "Please specify price" },
                notEmpty: { msg: "Please specify price" }
            }
        },
        bedroom: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notNull: { msg: "Please specify number of bedrooms" },
                notEmpty: { msg: "Please specify number of bedrooms" }
            }
        },
        bath: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notNull: { msg: "Please specify number of baths" },
                notEmpty: { msg: "Please specify number of baths" }
            }
        },
        carpet_area: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notNull: { msg: "Please specify carpet area" },
                notEmpty: { msg: "Please specify carpet area" }
            }
        }
    }, {
        sequelize,
        modelName: constants.PROPERTY,
    });
    return Property;
};