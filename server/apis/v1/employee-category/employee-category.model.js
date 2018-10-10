'use strict';
let mongoose    = require('mongoose');

/* ------ NOTE -----
 1 = All rights equal to owner,
 2 = Rights equal to Manager,
 3 = Rights equal to Cashier or Bill Counter Man
 4 = No rights
*/


var EmployeeCategorySchema = mongoose.Schema({
    categoryName : {
        type : String,
        lowercase: true,
        required : [true, "Employee category Name is required"],
        unique: true
    },
    accessType : {
        type: Number,
        min: 1,
        max: 4,
        required: true,
        default: 4
    },
    createAt : {
		type : Date,
		default : Date.now
	}
})


module.exports = mongoose.model('EmployeeCategory', EmployeeCategorySchema);
