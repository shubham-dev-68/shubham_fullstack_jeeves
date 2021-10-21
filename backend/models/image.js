'use strict';

const errorMessages = require('../constants/error_messages');
const constants = require('../constants');

const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Image extends Model {

        static associate(models) {
            // define association here
            this.belongsTo(models.Property, { foreignKey: "property_id" })
        }
        
        toJSON() {
            return {...this.get(), updatedAt: undefined, createdAt: undefined }
        }

    };
    Image.init({
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: errorMessages.IMAGE_CONTENT_REQUIRED },
                notEmpty: { msg: errorMessages.IMAGE_CONTENT_CANNOT_BE_EMPTY }
            }
        }
    }, {
        sequelize,
        modelName: constants.IMAGE,
    });
    return Image;
};