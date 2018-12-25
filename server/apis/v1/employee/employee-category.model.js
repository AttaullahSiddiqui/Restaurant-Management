'use strict';
let mongoose    = require('mongoose');
let branches    = require('../branch/branch.model');
/* ------ NOTE -----
 1 = All rights equal to owner,
 2 = Rights equal to Manager,
 3 = Rights equal to Cashier or Bill Counter Man
 4 = No rights
*/

var EmployeeCategorySchema = mongoose.Schema({
    branchId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branches',
        required : [true, "Branch id is required"]
    },
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

EmployeeCategorySchema.path('branchId').validate(function (value) {
    return new Promise(function(resolve, reject){
        branches.findOne({'_id': value}, function (err, doc) {
            if (err || !doc) {
                resolve(false);
            } 
            resolve(true);
        });
    });
}, 'Invalid branch id');


module.exports = mongoose.model('employee_categories', EmployeeCategorySchema);
