'use strict';

var branch      = require('./branch.model');
var errHandler  = require('../../../utils/errorHandler');

module.exports = {
    getAllBranches      : getAllBranches,
    createNewBranch     : createNewBranch,
    updateBranchDetails : updateBranchDetails,
    removeBranch        : removeBranch
};


function getAllBranches(req, res){
    branch.find({}, function(err, result){
        return res.respondSuccess(result,"Fetched all branch", 1);
    },function(err){
        var error = errHandler.handle(err);
        return res.respondError(error[0], error[1]);
    });
}

function createNewBranch(req, res){
    var branchObj = {
        branchName : req.body.name,
        branchAddress : req.body.address,
        city : req.body.city,
        openingDate : req.body.openingDate
        // branchMapLocation : {
        //     latitude : req.body.latitude,
        //     longitude : req.body.longitutde
        // }
    }
    var newBranch = new branch(branchObj);
	newBranch.save().then(function(result){
        return res.respondSuccess(null,"Branch created successfully", 2);
    },function(err){
        var error = errHandler.handle(err);
        return res.respondError(error[0], error[1]);  
    });
}

function updateBranchDetails(req, res){
    if(!req.body.branchId){
        return res.respondError("Branch id is required", -4);
    }
    if(!req.body.name && !req.body.address && !req.body.city && !req.body.openingDate){
        return res.respondError("Minimum 1 feild is required for update", -4);
    }
    let obj = {};
    req.body.name ? (obj.branchName = req.body.name) : null;
    req.body.address ? (obj.branchAddress = req.body.address) : null;
    req.body.city ? (obj.city = req.body.city) : null;
    req.body.openingDate ? (obj.openingDate = req.body.openingDate) : null;
    // req.body.latitude ? (obj.branchMapLocation.latitude = req.body.latitude) : null;
    // req.body.longitude ? (obj.branchMapLocation.longitude = req.body.longitude) : null;
    
    branch.updateOne({'_id': req.body.branchId}, {$set : obj } ,
                { runValidators: true }, function(err, success){
                    if(err){
                        var error = errHandler.handle(err);
                        return res.respondError(error[0], error[1]);
                    }
                    else if(success.n){
                        return res.respondSuccess(success,"Branch details updated successfully", 1);
                    }
                    return res.respondError("No branch details updated", -3);
                });

}

function removeBranch(req, res){
    if(!req.query.branchId){
        return res.respondError("Branch id is required", -4);
    }
    branch.deleteOne({'_id' : req.query.branchId}).then(function(success){
        if( (success.n == 1) && (success.ok == 1) ){
            return res.respondSuccess(success,"Branch removed successfully", 1);
        }
        return res.respondError("Branch not removed", -3);
    }, function(err){
        var error = errHandler.handle(err);
        return res.respondError(error[0], error[1]);
    }); 
}
