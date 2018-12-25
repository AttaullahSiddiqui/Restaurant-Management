'use strict';

var branch      = require('./branch.model');
var employee    = require('../employee/employee.model');
var errHandler  = require('../../../utils/errorHandler');
var helper      = require('../../../utils/helper');

module.exports = {
    getAllBranches      : getAllBranches,
    createNewBranch     : createNewBranch,
    updateBranchDetails : updateBranchDetails,
    removeBranch        : removeBranch
};


function getAllBranches(req, res){
    branch.find({}, function(err, result){
        if(err){
            var error = errHandler.handle(err);
            return res.respondError(error[0], error[1]);
        }
        return res.respondSuccess(result,"Fetched all branch", 1);
    });
}

function createNewBranch(req, res){
    var newBranch = new branch({
        branchName : req.body.name,
        branchAddress : req.body.address,
        city : req.body.city,
        openingDate : req.body.openingDate
    });
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
    let updateModel = {
        name : 'branchName',
        address : 'branchAddress',
        city : 'city',
        openingDate: 'openingDate'
    }
    let hashData = helper.mappingModel(req.body, updateModel);
    if(Object.keys(hashData).length === 0){
        return res.respondError("Minimum 1 feild is required for update", -4);
    }
    branch.updateOne({'_id': req.body.branchId}, {$set : hashData } ,
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
    employee.findOne({'empBranchId' : req.query.branchId}, function(err, result){
        if(err){
            var error = errHandler.handle(err);
            return res.respondError(error[0], error[1]);
        }
        else if(result) {
            return res.respondError("Branch not be removed its used as a refernce in other collections", -1);
        }else{
            return branch.deleteOne({'_id' : req.query.branchId}).then(function(success){
                if( (success.n == 1) && (success.ok == 1) ){
                    return res.respondSuccess(success,"Branch removed successfully", 1);
                }
                return res.respondError("Branch not removed", -3);
            }, function(err){
                var error = errHandler.handle(err);
                return res.respondError(error[0], error[1]);
            }); 
        };
    });
}



