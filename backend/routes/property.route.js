const express = require('express')
const router = new express.Router()
const propertyController = require("../controllers/property.controller");
const formidableMiddleware = require('express-formidable');
const path = require('path');

router.post('/create', formidableMiddleware({
  encoding: 'utf-8',
  uploadDir: path.resolve(__dirname, "../property_image"),
  multiples: true, // req.files to be arrays of files
  keepExtensions : true,
  filter: function ({name, originalFilename, mimetype}) {
    // keep only images
    return mimetype && mimetype.includes("image");
  }
}), propertyController.createProperty);

router.post('/get-selected-date', propertyController.getBySelectedDate);
router.post('/get-range-date', propertyController.getByRangeDate);
router.post('/get-range-price', propertyController.getByRangePrice);
router.get('/list-properties', propertyController.listProperties);
router.get('/list-properties-locality', propertyController.listPropertiesByLocalities);
router.get('/list-properties-bedroom', propertyController.listPropertiesByBedroom);
router.get('/get-distinct-localities', propertyController.getDistinctLocalities);
router.get('/recent', propertyController.recent);

// get-distinct-localities
module.exports = router