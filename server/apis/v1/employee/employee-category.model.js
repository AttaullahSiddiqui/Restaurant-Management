'use strict';
let mongoose    = require('mongoose');

var EmployeeCategorySchema = mongoose.Schema({
    categoryName : {
        type : String,
        unique: true,
        lowercase: true,
        required: [true, "Category name is required"]
    },
    createAt : {
		type : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('employee_categories', EmployeeCategorySchema);
