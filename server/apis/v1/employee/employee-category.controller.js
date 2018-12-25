'use strict';

var empCategory = require('./employee-category.model');
var employee    = require('./employee.model');
var errHandler  = require('../../../utils/errorHandler');

module.exports = {
    createCategory      : createCategory,
    updateCategory      : updateCategory,
    getAllCategories    : getAllCategories,
    removeCategory      : removeCategory
};

// Only access manager or owner
function getAllCategories(req, res){
    let query = {};
    if(req.body.userRole == 1){ //:: owner block
        if(req.body.branchId){ // :: If id not provided fetch all categories, If id provided fetch by against provided id
            query = { 'branchId' : req.body.branchId };
        }
    }else{ //:: manager block
        query = { 'branchId' : req.body.branchId };
    }
    empCategory.find(query, function(err, result){
        if(err){
            var error = errHandler.handle(err);
            return res.respondError(error[0], error[1]);
        }
        return res.respondSuccess(result,"Fetched Employees categories", 1);
    });
}

function createCategory(req, res){
    var newEmpCategory = new empCategory({
        branchId: req.body.branchId,    // if Owner provide from client side if manager fetch from json Web token
        categoryName : req.body.name, 
        accessType : req.body.type
    });
	newEmpCategory.save().then(function(result){
        return res.respondSuccess(null,"Employee Category created successfully", 2);
    },function(err){
        var error = errHandler.handle(err);
        return res.respondError(error[0], error[1]);  
    });
}

function updateCategory(req, res){
    if(!req.body.empCategoryId){
        return res.respondError("Employee category id is required", -4);
    }
    let updateModel = {
        branchId: 'branchId',  // if Owner provide from client side if manager fetch from json Web token
        name : 'categoryName',
        type : 'accessType'
    }
    let hashData = helper.mappingModel(req.body, updateModel);
    if(Object.keys(hashData).length === 0){
        return res.respondError("Minimum 1 feild is required for update", -4);
    }

    empCategory.updateOne({'_id': req.body.empCategoryId}, {$set : updateModel } ,
                { runValidators: true }, function(err, success){
                    if(err){
                        var error = errHandler.handle(err);
                        return res.respondError(error[0], error[1]);
                    }
                    else if(success.n){
                        return res.respondSuccess(success,"Employee category updated successfully", 1);
                    }
                    return res.respondError("No Employee category updated", -3);
                });

}

// Need to update remove api for owner and manager
function removeCategory(req, res){
    if(!req.query.empCategoryId){
        return res.respondError("Employee category id is required", -4);
    }
    employee.findOne({'empCategoryId' : req.query.empCategoryId}, function(err, result){
        if(err){
            var error = errHandler.handle(err);
            return res.respondError(error[0], error[1]);
        }
        else if(result) {
            return res.respondError("Category not be removed its used as a refernce in other collections", -1);
        }else{
            return empCategory.deleteOne({'_id' : req.query.empCategoryId}).then(function(success){
                if( (success.n == 1) && (success.ok == 1) ){
                    return res.respondSuccess(success,"Employee category removed successfully", 1);
                }
                return res.respondError("Employee category not removed", -3);
            }, function(err){
                var error = errHandler.handle(err);
                return res.respondError(error[0], error[1]);
            }); 
        };
    });
}
