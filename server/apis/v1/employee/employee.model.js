'use strict';
let mongoose    = require('mongoose');
let empCategory = require('./employee-category.model');
let branches    = require('../branch/branch.model');

var EmployeeSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required"]
    },
    fatherName : {
        type : String,
        required : [true, "Father name is required"]
    },
    age : {
        type : Number,
        required : [true, "Age is required"]
    },
    empCategoryId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee_categories',
        required : [true, "Employee category is required"]
    },
    empBranchId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branches',
        required : [true, "Branch is required"]
    },
    picture : {
        type : String,
        required : [true, "Picture is required"]
    },
    joiningDate : {
        type : Date,
        required : [true, "Joining date is required"]
    },
    resigningDate : Date,
    salary : {
        type : Number,
        required : [true, "Salary is required"]
    },
    reference : String,
    contactNo : Number,
    address : {
        type : String,
        required : [true, "Address is required"]
    },
    status: Boolean,
    createAt : {
		type : Date,
		default : Date.now
	}
});
	

EmployeeSchema.path('empCategoryId').validate(function (value) {
    return new Promise(function(resolve, reject){
        empCategory.findOne({'_id': value}, function (err, doc) {
            if (err || !doc) {
                resolve(false);
            } 
            resolve(true);
        });
    });
}, 'Invalid employee category');


EmployeeSchema.path('empBranchId').validate(function (value) {
    return new Promise(function(resolve, reject){
        branches.findOne({'_id': value}, function (err, doc) {
            if (err || !doc) {
                resolve(false);
            } 
            resolve(true);
        });
    });
}, 'Invalid branch id');


module.exports = mongoose.model('employees', EmployeeSchema);
