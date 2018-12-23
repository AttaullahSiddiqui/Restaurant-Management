'use strict';

var employee = require('./employee.model');
var errHandler  = require('../../../utils/errorHandler');

module.exports = {
    createEmployee  : createEmployee,
    updateEmployee  : updateEmployee,
    getAllEmployee  : getAllEmployee,
    removeEmployee  : removeEmployee
};


function getAllEmployee(req, res){
    // employee.find({}, function(err,result){
    //     if(err){
    //         var error = errHandler.handle(err);
    //         return res.respondError(error[0], error[1]);
    //     }
    //     return res.respondSuccess(result,"Fetched Employees list", 1);
    // });


    employee.aggregate([
        {
            $lookup: {
                from: "branches",
                localField: "empBranchId",
                foreignField: "_id",
                as: "emp_branch"
            }
        },{
            $lookup: {
                from: "employee_categories",
                localField: "empCategoryId",
                foreignField: "_id",
                as: "emp_category"
            }
        },
        { $project : { 
            'empBranchId' : 0 ,
            'empCategoryId' : 0
        } }
    ], function(err , result){
        if(err){
            var error = errHandler.handle(err);
            console.log("Error occur --------->",error);
            return res.respondError(error[0], error[1]);
        }
        return res.respondSuccess(result,"Fetched Employees list", 1);
    })

}

function createEmployee(req, res){
    let empObj = {
        name : req.body.name,
        fatherName : req.body.fatherName,
        age : req.body.age,
        empBranchId: req.body.branch,
        empCategoryId: req.body.type,
        picture : req.body.picture,
        joiningDate : req.body.joiningDate,
        salary : req.body.salary,
        reference: req.body.reference,
        contactNo : req.body.contactNo,
        address : req.body.address,
        status: true
    }
    var newEmpCategory = new employee(empObj);
	newEmpCategory.save().then(function(result){
        return res.respondSuccess(null,"Employee created successfully", 2);
    },function(err){
        var error = errHandler.handle(err);
        return res.respondError(error[0], error[1]);  
    });
}

function updateEmployee(req, res){
    if(!req.body.employeeId){
        return res.respondError("Employee id is required", -4);
    }
    let obj = {};
    req.body.name ? (obj.categoryName = req.body.name) : null;
    req.body.fatherName  ? (obj.fatherName = req.body.fatherName) : null;
    req.body.type ? (obj.accessType = req.body.type) : null;

    employee.updateOne({'_id': req.body.empCategoryId}, {$set : obj } ,
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

function removeEmployee(req, res){
    if(!req.query.empId){
        return res.respondError("Employee id is required", -4);
    }
    employee.deleteOne({'_id' : req.query.empId}).then(function(success){
        if( (success.n == 1) && (success.ok == 1) ){
            return res.respondSuccess(success,"Employee removed successfully", 1);
        }
        return res.respondError("Employee not removed", -3);
    }, function(err){
        var error = errHandler.handle(err);
        return res.respondError(error[0], error[1]);
    }); 
}
