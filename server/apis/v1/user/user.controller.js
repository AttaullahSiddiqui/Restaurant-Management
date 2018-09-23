'use strict';

let user = require('./user.model');

module.exports = function(){
    register : register
};

function register(req, res){

    if(!req.body.name || !req.body.email || !req.body.password){
        return res.respondError("Incomplete Arguments", -4)
    }
    var userObj = { name : req.body.name, email : req.body.email, password : req.body.password }
    var newUser = new user(userObj);
	newUser.save().then(function(result){
        return res.respondSuccess(null,"User account created successfully", 2);
    },function(err){
        return res.respondError("Error in user registration", -1)
    })

}
