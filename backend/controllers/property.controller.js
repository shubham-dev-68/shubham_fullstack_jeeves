const {Property, Image} = require("../models");
const {sendSuccessResponse, sendErrorResponse} = require("../utils/response.types")
const {Sequelize} = require('../models')
const moment = require("moment")
const { Op } = require("sequelize");
const {moveFile, makeThumbnailAndStore} = require('../utils');
const path = require('path');
var fs = require('fs');

module.exports.createProperty = async (req, res)=>{
	try{
		const {name, address, locality, price, bedroom, bath, carpet_area} = req.fields;
		if(!(name && address && locality && price && bedroom && bath && carpet_area)){
			throw({code:400, message:"Please Give all the details"})
		}
		const property = await Property.create({name, address, locality, price, bedroom, bath, carpet_area});

		// If property created
        if (property) {
        	let toMove = []; //moving images to corect directory (Prmoise array)
        	let toThumbanail = []; //making thumbanails (Promise array)
        	let files = req.files["images"];
			let imageFilenames = [];
			let destination = path.resolve(__dirname, `../property_image/${property.id}/`)

			// make directory if not already present
			if (!fs.existsSync(destination)){
			    fs.mkdirSync(destination);
			}

			// loop images and get relavant info
			for(let i=0; i<files.length; i++){
				let filename = files[i].path.split("/").pop();
				imageFilenames.push({"url":filename, "property_id":property.id});
				toMove.push(moveFile(files[i].path, path.resolve(__dirname, `../property_image/${property.id}/${filename}`)));
			}

			// execulte bulk move
			let moved = await Promise.all(toMove)

			// loop moved to create thumbnail task
			for(let i=0; i<moved.length;i++){
				let movedImage = moved[i];
				let extension = movedImage.split(".").pop()
				toThumbanail.push(makeThumbnailAndStore(movedImage, extension))
			}

			// execute bulk thumbnail task (Ideally this should happen asynchronusly via que, should not wait for it to publish reponse)
			let thumbnailCreated = await Promise.all(toThumbanail)

			// if move succesfull and thumbnail also created, make DB entries of image for reference
            if(moved && thumbnailCreated){
            	if(imageFilenames.length){
	        		const imagesRes = await Image.bulkCreate(imageFilenames)
	        		if(!imagesRes)
	        			throw({code:500, message:errorMessages.ERROR_UPLOAD_IMAGES})
	        		else{
	        			console.log(imagesRes)
	        		}
	        	}
            	sendSuccessResponse(res, {property})
            }
            else
            	throw({code:500, message:"Issue in file handling"})

        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}

module.exports.listProperties = async (req, res)=>{
	try{
		let {page, limit} = req.query;
		if (!(page>0 && limit>0)){
			throw({"code":400, message:errorMessages.PAGE_AND_LIMIT_VALUE_ERROR});
		}
		const properties = await Property.findAndCountAll({
			"include":"Images",
			"limit" : parseInt(limit),
			"offset" : (parseInt(page)-1)*parseInt(limit)
		})
        if (properties) {
            sendSuccessResponse(res, {properties});
        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}

module.exports.listPropertiesByLocalities = async (req, res)=>{
	try{
		let {page, limit, locality} = req.query;
		if (!(page>0 && limit>0)){
			throw({"code":400, message:errorMessages.PAGE_AND_LIMIT_VALUE_ERROR});
		}
		const properties = await Property.findAndCountAll({
			"include":"Images",
			where : {'locality':locality},
			"limit" : parseInt(limit),
			"offset" : (parseInt(page)-1)*parseInt(limit)
		})
        if (properties) {
            sendSuccessResponse(res, {properties});
        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}

module.exports.listPropertiesByBedroom = async (req, res)=>{
	try{
		let {page, limit, bedroom} = req.query;
		if (!(page>0 && limit>0)){
			throw({"code":400, message:errorMessages.PAGE_AND_LIMIT_VALUE_ERROR});
		}
		const properties = await Property.findAndCountAll({
			"include":"Images",
			where : {'bedroom':bedroom},
			"limit" : parseInt(limit),
			"offset" : (parseInt(page)-1)*parseInt(limit)
		})
        if (properties) {
            sendSuccessResponse(res, {properties});
        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}

module.exports.getDistinctLocalities = async (req, res)=>{
	try{
		const localities = await Property.findAll({
			attributes: [
		        [Sequelize.fn('DISTINCT', Sequelize.col('locality')) ,'locality'],
    		]
		})
        if (localities) {
            sendSuccessResponse(res, {localities});
        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}

module.exports.getBySelectedDate = async (req, res)=>{
	try{
		let {date, page, limit} = req.body;
		if(!date){
			throw({"code":400, message:"Please pass date"});
		}
		if (!(page>0 && limit>0)){
			throw({"code":400, message:errorMessages.PAGE_AND_LIMIT_VALUE_ERROR});
		}
		let fromDate = new Date(date);
		let toDate = new Date(new Date(date).getTime() + 24*60*60*1000);
		const properties = await Property.findAndCountAll({
			"include":"Images",
			where : {
			    createdAt: {
			    	[Op.lt]: toDate,
        			[Op.gt]: fromDate
			    }
			},
			"limit" : parseInt(limit),
			"offset" : (parseInt(page)-1)*parseInt(limit)
		})
        if (properties) {
            sendSuccessResponse(res, {properties});
        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}

module.exports.getByRangeDate = async (req, res)=>{
	try{
		let {from, to} = req.body;
		let fromDate = new Date(from);
		let toDate = new Date(new Date(to).getTime() + 24*60*60*1000);
		const properties = await Property.findAll({
			"include":"Images",
			where : {
			    createdAt: {
			    	[Op.lt]: toDate,
        			[Op.gt]: fromDate
			    }
			}
		})
        if (properties) {
            sendSuccessResponse(res, {properties});
        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}

module.exports.getByRangePrice = async (req, res)=>{
	try{
		let {minPrice, maxPrice, page, limit} = req.body;
		if (!(page>0 && limit>0)){
			throw({"code":400, message:errorMessages.PAGE_AND_LIMIT_VALUE_ERROR});
		}
		if(!minPrice && !maxPrice){
			throw({"code":400, message:"INVALIDE MIN AND MAX PRICE"});
		}
		const properties = await Property.findAndCountAll({
			"include":"Images",
			where : {
			    price: {
			    	[Op.lt]: maxPrice,
        			[Op.gt]: minPrice
			    }
			},
			"limit" : parseInt(limit),
			"offset" : (parseInt(page)-1)*parseInt(limit)
		})
        if (properties) {
            sendSuccessResponse(res, {properties});
        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}

module.exports.recent = async (req, res)=>{
	try{
		let {minPrice, maxPrice} = req.body;
		const properties = await Property.findAll({
			"include":"Images",
			limit:4,
			order: [ [ 'createdAt', 'DESC' ]]
		})
        if (properties) {
            sendSuccessResponse(res, {properties});
        } else {
            throw(err.SOMETHING_WENT_WRONG);
        }
	}catch(err){
		sendErrorResponse(res, err)
	}
}