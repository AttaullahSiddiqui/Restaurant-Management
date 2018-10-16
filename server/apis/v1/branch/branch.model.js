'use strict';

let mongoose    	= require('mongoose');

var BranchSchema = mongoose.Schema({
    branchName : {
        type : String,
        unique: true,
        lowercase: true,
        required: [true, "Branch Name is required"]
    },
    branchAddress: {
        type : String,
        required: [true, "Branch Address is required"]
    },
    city: {
        type: String,
        required: [true, "city is required"]
    },
    // branchMapLocation: {
    //     latitude : {
    //         type: Number,
    //         required : [true, "Latitude is required"]
    //     },
    //     longitude : {
    //         type: Number,
    //         required : [true, "Longitude is required"]
    //     }
    // },
    openingDate : {
        type : Date,
        required: [true, "Opening date is required"],
        default : Date.now
    },
});

module.exports = mongoose.model('Branch', BranchSchema);
