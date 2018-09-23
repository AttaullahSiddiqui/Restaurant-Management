/**
 * Created by Muhammad Mateen on 05/07/2018.
 */
'use strict';

let helper = require('./helper');

let httpCodeMap = {
	'-6': 409,          //Name already exists (Conflict)
	'-5': 503,          //database connection error(Service Unavailable)
	'-4': 400,          //incomplete arguments (Bad Request)
	'-3': 404,          //Not found
	'-2': 401,          //UnAuthorized Access Attempt
	'-1': 500,          //unexpected error or database error (Internal Server Error)
	'1' : 200,          //Success or update
	'2' : 201,           //Created
	'4' : 204			//No Content
};

module.exports = function(req, res, next){
	helper.extendObject(res, responseHandler);
	next();
};

let responseHandler = {
	respondError	:  function(error, code){
		this.status((httpCodeMap[code] || 500))
		this.json({
            success : false,
            message : error
        })
	},

	respondSuccess	: function(data, successMsg, code){
		this.status((httpCodeMap[code] || 200))
		this.json({
            success : true,
            message : successMsg || null,
            data    : data || null
        });
	},

	respondMissingArguments	: function (errorMsg){
		this.status(400)
		this.json({
			success : false,
			message: errorMsg
		});
	}
}

