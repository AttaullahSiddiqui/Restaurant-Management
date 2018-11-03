'use strict';

let mongoose    = require('mongoose');

var CategoryItemsSchema = mongoose.Schema({
    itemName : {
        type : String,
        lowercase: true,
        required : [true, "Item Name is required"]
    },
    price : {
        type : Number,
        required : [true, "Item Price is required"]
    },
    quantity : {
        type : Number,
        required : [true, "Item quantity is required"]
    },
    unit : {
        type : String,
        required : [true, "Item unit is required"]
    }
})


var MenuSchema = mongoose.Schema({
    categoryName : {
		type: String,
        unique  : true,
        lowercase: true,
		required : [true, "Menu Category Name is required"]
    },
    categoryItems : [CategoryItemsSchema]
});



module.exports = mongoose.model('Menu', MenuSchema);
