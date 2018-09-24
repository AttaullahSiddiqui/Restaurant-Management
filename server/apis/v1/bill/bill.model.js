'use strict';

// import crypto from 'crypto';
var mongoose    	= require('mongoose');

var billItemSchema = mongoose.Schema({
    itemRefId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Menu',
        required : [true, "Item id is required should not be null"]
    },
    name : {
        type : String,
        required : [true, "Item name is required should not be null"]
    },
    quantity : {
        type : Number,
        required : [true, "Item quantity is required should not be null"]
    },
    amount : {
        type : Number,
        required : [true, "Item amount is required should not be null"]
    }
});

var BillSchema = mongoose.Schema({
    billNo : {
        type : Number,
        required : [true, "Bill Number is required should not be null"],
        unique  : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    totalAmount : {
        type : Number,
        required : [true, "Bill total amount is required should not be null"]
    },
    cashReceived : {
        type : Boolean,
        required : [true, "Cash received value is required"]
    },
    items : [billItemSchema]
});


module.exports = mongoose.model('Bill', BillSchema);
