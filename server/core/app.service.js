'use strict';

var bcrypt 		= require('bcrypt');

const USER_ROLES = ['owner', 'admin', 'user'];

module.exports = {
    userRoles               : USER_ROLES,
    comparePassword         : comparePassword,
    validateRequiredFeilds  : validateRequiredFeilds,
    getUpdatedHashedObj     : getUpdatedHashedObj,
    validateToken           : validateToken
};

function comparePassword(plainPass, hashPass, cb){
    bcrypt.compare(plainPass, hashPass, function (err, isMatch) {
        if(err){
            return cb(err);
        }
        return cb(null, isMatch);
    });
}

function validateRequiredFeilds(arr, body){
    var errors = [];
    arr.forEach(function(element){
        if(!body[element]){
            errors.push(element + " is required should not be null");
        }
    });
    return errors;
}

/*
            Params
    arr         :: feilds which updated in db,
    body        :: api data,
    isNested    :: means nested push item updated,
    name        :: nested push feild name
*/
function getUpdatedHashedObj(arr, body, isNested, name){
    var obj = {};
    if(isNested){
        arr.forEach(function(element) {
            if(body[element]){
                obj[name+'.$.'+element] = body[element];
            }
        });
    }else{
        arr.forEach(function(element) {
            if(body[element]){
                obj[element] = body[element];
            }
        });
    }
    return obj;
}

function validateToken(req, res, next){
    if(!req.headers.authorization || !req.body.token){
        return res.respondError("Authorization token is required", -2); 
    }
    var token = req.headers.authorization || !req.body.token;
    return jwt.verifyToken(token, function(err, data){
        if(err){
            return res.respondError("Invalid token", -2); 
        }
        req.loginUserId = data.userID;
        req.role        = data.role;
        next();
    })
}
