'use strict';

let mongoose    	= require('mongoose');
let bcrypt 			= require('bcrypt');
let service 		= require('../../services/app.services');

var UserSchema = mongoose.Schema({
    userName : {
		type: String,
		lowercase: true,
		unique  : true,
		required : [true, "User Name is required should not be null"]
    },
	password: {
		type: String,
		required : [true,"Password is required should not be null"]
	},
	picture : {
		type : String
	},
	role: {
		type: String,
		required : [true,"Role is required should not be null"],
		enum: service.userRoles
	},
	createAt : {
		type : Date,
		default : Date.now()
	}
});


/**
 * Validations
 */

UserSchema
	.path('userName')
	.validate(function (userName) {
		var isValid = userName.split(' ');
		if(isValid.length >= 2)
		return false;
		return true;
	}, "No space allowed between username");	


/**
 * Pre-save hook
 */
var SALT_FACTOR = 10;

UserSchema.pre("save", function (next) {
	var user = this;
    if (!this.isModified("password")) {
        return next();
	}
	bcrypt.hash(user.password, SALT_FACTOR, function(err, hash) {
		if (err) {
			var hashError = new Error("Unexpcted error")
			next(hashError);
		}
		user.password = hash;
		next();
	});
});


module.exports = mongoose.model('User', UserSchema);
