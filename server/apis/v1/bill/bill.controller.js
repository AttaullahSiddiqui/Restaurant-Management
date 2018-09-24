'use strict';

var Bill        = require('./model');
var errHandler  = require('../../../utils/errorHandler');


module.exports = {
    createBill  : createBill,
    getBill     : getBill,
    getAllBills : getAllBills,
    currentSaleDetails : currentSaleDetails 
};


function createBill(req, res){
    getTotalBills(function(err, totalBills){
        if(err){
            var error = errHandler.handle(err);
            return res.respondError(error[0], (error[1] || -1) );
        }
        var newBill = new Bill({billNo : totalBills+1, totalAmount : req.body.totalAmount, cashReceived : req.body.cashReceived, items : req.body.items
        });
        return newBill.save().then(function(result){
            return res.respondSuccess(result,"Bill created successfully", 2);
        },function(err1){
            var error = errHandler.handle(err1);
            return res.respondError(error[0], (error[1] || -1) );
        });
    });
};

function getTotalBills(cb){
    try{
        Bill.count({}, function(err, result){
            if(err){
                return cb(err);
            }
            return cb(null,result);
        });
    }catch(error){
        return cb(error);
    }
};

    // :: Cash Received = true  ---> Received
    // :: Cash Received = false ---> Pending
function getBill(req, res){
    if(!req.params.no){
        return res.respondError("Bill no is required", -4);
    }
    Bill.find({ billNo: +req.params.no }).then(function(result){
        if(result.length > 0){
            return res.respondSuccess(result,"Bill fetched", 1);    
        }
        return res.respondSuccess(null,"No bill matched", 4);
    },function(err){
        console.log("Error : -------->",err);
        var error = errHandler.handle(err);
        return res.respondError(error[0], error[1]);
    });
}

function getAllBills(req, res){
    var billTypes = ['Pending', 'Received'];
    var offsetIndex = 0;
    if(!req.query.billType || (billTypes.indexOf(req.query.billType) > -1) ){
        return res.respondError("Invalid value of bill type", -4);
    }
    if(req.query.offsetIndex && !isNaN(req.query.offsetIndex)){
        offsetIndex = +req.query.offsetIndex;
    }
    // Bill.find({
    //     cashReceived: (req.query.billType === 'Pending' ? false : true ), 
    //     date :  {'$lte' : req.query.date || new Date().toLocaleDateString()},
    // }).skip(offsetIndex).limit(10).then(function(result){
    //     return res.respondSuccess(result,"Fetched Bills list", 1);
    // },function(err){
    //     console.log("Error : -------->",err);
    //     var error = errHandler.handle(err);
    //     return res.respondError(error[0], error[1]);
    // });
}

function currentSaleDetails(req, res){
    Bill.find({

    }).then(function(result){
        return res.respondSuccess(result,"Current Sale details", 1);
    }, function(err){
        console.log("Error : -------->",err);
        var error = errHandler.handle(err);
        return res.respondError(error[0], error[1]);
    });
};