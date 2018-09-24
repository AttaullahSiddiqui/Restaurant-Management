'use strict';

var jwt     = require('jsonwebtoken');
var config  = require('../app.config');

module.exports = {
    generateToken   : generateToken,
    verifyToken     : verifyToken,
}

function generateToken(payload, cb){
    jwt.sign(payload, config.JWT.secretKey, null, function(err, token) {
        if(err) {
            return cb(err);
        }
        cb(null, token);
    });
}

function verifyToken(token, cb) {
    jwt.verify(token, config.JWT.secretKey, function(err, decoded) {
        if(err) {
            return cb(err);
        }
        cb(null, decoded);
    });
}
