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
        unique: true,
        lowercase: true,
        required: [true, "Category name is required"]
    },
    accessType : {
        type: Number,
        min: 1,
        max: 4,
        required: [true, "Role is required"],
        default: 4
    },
    createAt : {
		type : Date,
		default : Date.now
	}
});


module.exports = mongoose.model('employee_categories', EmployeeCategorySchema);
