'use strict';

let mongoose    	= require('mongoose');
let bcrypt 			= require('bcryptjs');
let employees    = require('../employee/employee.model');

const USER_ROLES = [
	'1'			// Owner
];

const ACCOUNT_APROVED_TYPES = [
	'1',		// Pending
	'2',		// Approve
	'3'			//Reject
];

var UserSchema = mongoose.Schema({
	name: {
		type		: String,
		required	: [function(){
			return this.role == '1';
		},"Name is required"]
	},
	userName : {
		type		: String,
		lowercase	: true,
		unique		: true,
		required	: [true, "User Name is required"]
    },
	password: {
		type		: String,
		minlength	: 5,
		maxlength	: 12,
		required 	: [true,"Password is required"]
	},
	role: {
		type		: String,
		required	: [function(){
			return this.role == '1';
		},"Role is required"],
		enum		: USER_ROLES
	},
	mobileNo : {
		type		: Number,
		unique		: true,
		required	: [true,"Mobile no is required"]
	},
	mobileNoVerfied : {
		type	: Boolean,
		default	: false
	},
	accountApproved: {
		type 	: String,
		enum	: ACCOUNT_APROVED_TYPES,
		default	: ACCOUNT_APROVED_TYPES[0],
	},
	accountStatus: {
		type 	:  Boolean,
		default	: false
	},
	employeeId : {
		type	: mongoose.Schema.Types.ObjectId,
		ref		: 'employees',
		unique	: true
	},
	createAt : {
		type 	: Date,
		default	: Date.now
	}
});


/**
 * Validations
 */

UserSchema.path('userName').validate(function (userName) {
	var isValid = userName.split(' ');
	if(isValid.length >= 2)
		return false;
	return true;
}, "No space allowed between username");


UserSchema.path('employeeId').validate(function (value) {
	if(this.role === 1){
		return true;
	}
	return new Promise(function(resolve, reject){
		employees.findOne({'_id': value}, function (err, doc) {
			if (err || !doc) {
				resolve(false);
			} 
			resolve(true);
		});
	});

}, "Invalid employee Id");


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
