let User    = require('../apis/v1/user/user.model');
let jwt     = require('./jwtHelper.service'); 

module.exports = {
    isAdmin : isAdmin
};

function isAdmin(req, res, next){
    return validateToken(req, res).then(function(result){
        if(result.role === '1'){
            req.currentUser = result;
            return next();
        }
        return res.respondError("Unauthorized access", -2);
        //console.log("Result ----------> : ",req.currentUser);
    },function(error){
        return res.respondError("Unauthorized access", -2);
    });
};

function validateToken(req, res){
    return new Promise(function(resolve, reject){
        if(!req.headers.authorization){
            return reject(false); 
        }
        var token = req.headers.authorization;
        return jwt.verifyToken(token, function(err, data){
            if(err){
                return reject(false);
            }
            return getUserInfo(data.userID).then(function(result){
                return resolve(result);
            },function(error){
                return resolve(error);
            })
        });
    });
};

function getUserInfo(id){
    return new Promise(function(resolve, reject){
        User.findOne({_id: id, accountStatus: true},{password: 0}, function(err, fetchedUser){
            if(err || !fetchedUser){
                 return reject(false);
            }
            return resolve(fetchedUser);
        });
    });
};
