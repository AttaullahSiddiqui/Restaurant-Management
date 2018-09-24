'use strict';

let mongoose    	= require('mongoose');

var CategoryItemsSchema = mongoose.Schema({
    itemName : {
        type : String,
        required : [true, "Item Name is required should not be null"]
    },
    price : {
        type : Number,
        required : [true, "Item Price is required should not be null"]
    },
    quantity : {
        type : Number,
        required : [true, "Item quantity is required should not be null"]
    },
    unit : {
        type : String,
        required : [true, "Item unit is required should not be null"]
    }
})


var MenuSchema = mongoose.Schema({
    categoryName : {
		type: String,
		unique  : true,
		required : [true, "Menu Category Name is required should not be null"]
    },
    categoryItems : [CategoryItemsSchema]
});



module.exports = mongoose.model('Menu', MenuSchema);
