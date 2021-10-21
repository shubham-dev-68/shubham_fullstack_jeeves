module.exports.sendSuccessResponse = (res, data)=>{
	res.status(200).json({"success":true, ...data});
}

module.exports.sendErrorResponse = (res, err)=>{
	res.status(err.code===400?400: err.code===401?401 :500).send({message:err.message});
}