'use strict';
let mongoose    = require('mongoose');

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
    picture : {
        type : String,
        required : [true, "Picture is required"]
    },
    joiningDate : {
        type : Date,
        required : [true, "Joining date is required"]
    },
    resigningDate : {
        type : Date
    },
    salary : {
        type : Number,
        required : [true, "Salary is required"]
    },
    reference : {
        type : String
    },
    contactNo : {
        type : Number
    },
    address : {
        type : String,
        required : [true, "Address is required"]
    },
    status: {
        type: Boolean
    },
    createAt : {
		type : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Employees', EmployeeSchema);
