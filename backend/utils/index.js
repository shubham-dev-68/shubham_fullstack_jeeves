const mv = require('mv')
const fs = require('fs');
const genThumbnail = require('simple-thumbnail')

module.exports.moveFile = function(currentPath, destinationPath){
	return new Promise((res, rej)=>{
		mv(currentPath, destinationPath, function(err) {
		    if (err) {
		        rej(err)
		    } else {
		        console.log("Successfully moved the file!");
		        res(destinationPath)
		    }
		});
	})
}


module.exports.makeThumbnailAndStore = function(imagePath, extension){
	return genThumbnail(imagePath, `${imagePath.split(`.${extension}`)[0]}_thumb.${extension}`, '250x?')
}

