'use strict';

let bcrypt 		= require('bcryptjs');
let User        = require('./user.model');
let employees   = require('../employee/employee.model');
let service     = require('../../../core/app.service');
let twilio      = require('../../../core/twilio.service.js')
let errHandler  = require('../../../utils/errorHandler');
var helper      = require('../../../utils/helper');
// let jwt         = require('../../../core/jwtHelper.service');


module.exports = {
    authUser            : authUser,
    getUserDetails      : getUserDetails,
    createUser          : createUser,
    getNewUsersRequest  : getNewUsersRequest,
    getAllUsers         : getAllUsers,
    updateUserRequest   : updateUserRequest,
    updateUserStatus    : updateUserStatus
    // changePassword  : changePassword,
    // removeUser      : removeUser,
    // updateRole      : updateRole
};

const ACCOUNT_APROVED_TYPES = [
	'1',		// Pending
	'2',		// Approve
	'3'			//Reject
];

function getUserDetails(req, res){
    User.findOne({'_id' : req.loginUserId, status: true}, {'_id': 0,'password' : 0, 'userName': 0, 'createAt' : 0}, (err, result) => {
        if(err || !result){
            console.log("Error : -------->",err);
            return res.respondError("Unexpected Error", -1); 
        }
        else if(result.role == '1'){
            return res.respondSuccess(result,"User details", 1);
        }
        return employees.findOne({'_id': result.employeeId, status: true}, {'name': 1, 'picture': 1, 'empRole': 1}, (empError, empData) => {
            if(empError || !empData){
                return res.respondError("Unexpected Error", -1);
            }
            return res.respondSuccess(result,"User details", 1);
        });
    });
};

function updateUserStatus(req, res){
    if(!req.body.userId || helper.isNullOrUndefined(req.body.status) ){
        return res.respondError("User Id & Action is required", -4);
    }
    updateUserData(req.body.userId, {accountStatus : req.body.status}).then(success => {
        if(result.success){
            return res.respondSuccess(null,"User status updated successfully", 1);
        }
        return res.respondError(result.msg, result.statusCode);
    }, error => {
        return res.respondError(error.message, 500);
    });
};

function updateUserRequest(req, res){
    if(!req.body.userId || !req.body.actionType){
        return res.respondError("User Id & Action is required", -4);
    }
    if(req.body.actionType == 2 || req.body.actionType == 3){
        var updateModel = {};
        if(req.body.actionType == 3){
            updateModel.accountApproved = 3;
        }else{
            if(!req.body.empId){
                return res.respondError("Employee Id is required", -4);
            }
            updateModel.accountStatus = true;
            updateModel.accountApproved = 2;
            updateModel.employeeId = req.body.empId;
        }
        return updateUserData(req.body.userId, updateModel).then(result => {
            if(result.success){
                return res.respondSuccess(null,"User status updated successfully", 1);
            }
            return res.respondError(result.msg, result.statusCode);
        }, error => {
            return res.respondError(error.message, 500);
        });
    }
    return res.respondError("Invalid action value", -4);
};

// Generic function to update user data
function updateUserData(userId, modelData){
    return new Promise((resolve, reject) => {
		return User.updateOne({'_id': userId}, {$set : modelData} ,{ runValidators: true }, (err, success) => {
            if(err){
                var error = errHandler.handle(err);
                return resolve({
                    success : false,
                    msg: error[0],
                    statusCode: error[1]
                })
            }else if(success.n && success.nModified){
                return resolve({ success : true, data : success })
            }
            return resolve({
                success : false,
                msg: "Failed to update user details",
                statusCode: -3
            })
        });
	}).catch(error => {
        throw new Error(error);
    });   
};

function authUser(req, res){
    if(!req.body.password || !req.body.userName){
        return res.respondError("Username & Password is required", -4);  
    }
    User.findOne({userName: req.body.userName.toLowerCase()}, (err, fetchedUser) => {
        if(err){
            console.log("Error : -------->",err);
            var error = errHandler.handle(err);
            return res.respondError(error[0], error[1]); 
        }else if(!fetchedUser){
            return res.respondError("Sorry your username password doesn't recognize", -3);
        }else{
            return service.comparePassword(req.body.password, fetchedUser.password, function(error, isMatch){
                if(error){
                    return res.respondError("Unexpected Error", -1);
                }else if(!isMatch){
                    return res.respondError("Wrong password", -3);
                }else{
                    if(fetchedUser.role == '1'){ // Admin block
                        if(!fetchedUser.accountStatus){
                            return res.respondError("Your account was block", -7); 
                        }
                        return jwt.generateToken({userID : fetchedUser._id}, function(jwtErr, jwtSuccess){
                            if(jwtErr){
                                return res.respondError("Unexpected Error", -1);
                            }
                            return res.respondSuccess({
                                token: jwtSuccess,
                                userRole : fetchedUser.role
                            },"User login successfully", 1);
                        });
                    }else{
                        if(fetchedUser.empId){
                            var accountApprovedMsg = "";
                            switch(fetchedUser.accountApproved){
                                case '1': 
                                    accountApprovedMsg = "Your account request is pending";
                                    break;
                                case '-3' :
                                    accountApprovedMsg = "Your account request is rejected";
                                    break;
                                default: 
                                    accountApprovedMsg = "";   
                            }
                            if(accountApprovedMsg){
                                return res.respondError(accountApprovedMsg, -7); 
                            }
                            employees.findOne({'_id': fetchedUser.empId, status: true}, (empError, empData) => {
                                if(empError){
                                    var empParseError = errHandler.handle(empError);
                                    return res.respondError(empParseError[0], empParseError[1]); 
                                }else if(!empData){
                                    return res.respondError("Unexpected Error", -1);
                                }else{
                                    return jwt.generateToken({userID : fetchedUser._id}, function(jwtErr, jwtSuccess){
                                        if(jwtErr){
                                            return res.respondError("Unexpected Error", -1);
                                        }
                                        return res.respondSuccess({
                                            token: jwtSuccess,
                                            userRole : empData.empRole
                                        },"User login successfully", 1);
                                    });
                                }
                            })
                            
                        }
                        return res.respondError("Unexpected Error", -1);
                    }
                }                
            });
        }
    });
};



function createUser(req, res){
    var obj = {
        userName: req.body.userName,
        password: req.body.password,
        mobileNo: req.body.mobileNo
    }
    var newUser = new User(obj);
	newUser.save().then(function(result){
        return res.respondSuccess(null,"User account created successfully", 2);
    },function(err){
        var error = errHandler.handle(err);
        return res.respondError(error[0], (error[1] || -1) );  
    })
};

function getNewUsersRequest(req, res){
    User.find({'accountApproved' : '1'}, {'password' : 0}, function(err, result){
        if(err){
            console.log("Error : -------->",err);
            var error = errHandler.handle(err);
            return res.respondError(error[0], error[1]); 
        }
        return res.respondSuccess(result,"New users request list", 1);
    })
};

function getAllUsers(req, res){
    User.find({'accountStatus' : true}, {'password' : 0}, function(err, result){
        if(err){
            console.log("Error : -------->",err);
            var error = errHandler.handle(err);
            return res.respondError(error[0], error[1]); 
        }
        return res.respondSuccess(result,"User list", 1);
    });


    // var offsetIndex = 0;
    // if(req.query.offsetIndex && !isNaN(req.query.offsetIndex)){
    //     offsetIndex = +req.query.offsetIndex;
    // }
    // User.find({ role: { $ne: 'owner' } }, {'password' : 0}).skip(offsetIndex).limit(10).then(function(result){
    //     return res.respondSuccess(result,"Fetched User list", 1);
    // },function(err){
    //     console.log("Error : -------->",err);
    //     var error = errHandler.handle(err);
    //     return res.respondError(error[0], error[1]);
    // });
};

/*
function changePassword(req, res){
    if(!req.body.password || !req.body.newPassword){
        return res.respondError("Old password & new password is required", -4);  
    }
    User.findOne({'_id' : req.loginUserId}, function(err, fetchedUser){
        if(err){
            console.log("Unexpected Error : -------------> ",err);
            return res.respondError("Unexpected Error", -1); 
        }else if(!fetchedUser){
            return res.respondError("your are not login please login first", -3);
        }else{
            return service.comparePassword(req.body.password, fetchedUser.password, function(error, isMatch){
                if(error){
                    return res.respondError("Unexpected Error", -1);
                }else if(!isMatch){
                    return res.respondError("Old password does not match", -2);
                }else{
                    IncryptData(req.body.newPassword, function(err, hashPass){
                        if(err){
                            return res.respondError(err, -1);  
                        }
                        User.update(
                            {'_id': req.loginUserId},
                            {'$set' : {password : hashPass} } ).then(function(result){
                                if(result.n && result.nModified){
                                    return res.respondSuccess(null,"Password updated successfully", 1);
                                }
                                res.respondSuccess(null,"No Password updated", 1);
                            },function(err){
                                console.log("Error : ----------->",err);
                                return res.respondError("Unexpected Error", -1);  
                            });
                    })
                }
                
            });
        }
    })
    
}



function removeUser(req, res){
    if(!req.query.userId){
        return res.respondError("Username is required", -4);  
    }
    User.deleteOne({'_id' : req.query.userId}).then(function(success){
        if(success.deletedCount){
            return res.respondSuccess(success,"User removed successfully", 1);
        }
        return res.respondError("User not removed", -3);
    }, function(err){
        console.log("Error : -------->",err);
        return res.respondError("Unexpected Error", -1);
    });  
}

function updateRole(req, res){
    if(!req.body.userId || !req.body.newRole){
        return res.respondError("User id and role is required", -4);  
    }
    User.update({'_id': req.body.userId}, {$set : { role : req.body.newRole } } ,
                { runValidators: true }, function(err, success){
                    if(err){
                        var error = errHandler.handle(err);
                        return res.respondError(error[0], (error[1] || -1) );
                    }
                    else if(success.n){
                        return res.respondSuccess(success,"Role updated successfully", 1);
                    }
                    return res.respondError("No Role updated", -3);
                })
}

function IncryptData(data, cb){
    bcrypt.hash(data, 10, function(err, hash) {
		if (err) {
			console.log(":: Error in generating Hash password : ",err);
			var hashError = new Error("Unexpected error")
			cb(hashError);
		}
		cb(null, hash);
	});
}

/*function updateProfile(req, res){
    User.findOne({_id: req.loginUserId}, function(err, fetchedUser){
        if(err){
            console.log("Unexpected Error : -------------> ",err);
            return res.respondError("Unexpected Error", -1); 
        }else if(!fetchedUser){
            return res.respondError("Unrecoginzed user", -3);
        }else{
            req.loginUserRole = fetchedUser.role;
            var updateUserObj = service.profileUpdateObj(req);
            return User.update(
                {'_id': req.loginUserId},
                {'$set' : updateUserObj } ).then(function(result){
                    if(result.n && result.nModified){
                        return res.respondSuccess(null,"Profile updated successfully", 2);
                    }
                    res.respondSuccess(null,"No profile updated", 2);
                },function(err){
                    console.log("Error : ----------->",err);
                    return res.respondError("Unexpected Error", -2);  
                });
        }
    })
}*/

/*function forgotPassword(req, res){
    if(!req.body.email){
        return res.respondError("Email is required", -4);   
    }
    var isEmailvalid = service.emailPattern.test(req.body.email);
    if(!isEmailvalid)
    return res.respondError("Invalid email provided", -4);
    User.findOne({email: req.body.email.toLowerCase(), provider : service.authTypes[1]}, function(err, fetchedUser){
        if(err){
            console.log("Unexpected Error : -------------> ",err);
            return res.respondError("Unexpected Error", -1); 
        }else if(!fetchedUser){
            return res.respondError("Sorry your email doesn't recognize", -3);
        }else{

        }
    })

}*/




// db.users.aggregate([
//     { $match: {"_id": ObjectId("5c4a9d85fdd36d37888ac1ce"), "employeeId" :  ObjectId("5c3b0dad8795ec374c133be9") } },
//     { $lookup: {from : "employees", localField: "employeeId", foreignField: "_id", as: "employeeDetails"} }, 
//     { $project : { 'employeeId' : 0 } }
//     ])