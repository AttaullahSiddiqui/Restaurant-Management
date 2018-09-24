'use strict';

let express     = require('express');
let billCtrl    = require('./bill.controller');

let router  = express.Router();

module.exports = function (){

    // :: Prefix Path --- '/api/v1/bill' 

    /* Menu API*/
    router.post('/create', billCtrl.createBill);
    router.get('/search/:no', billCtrl.getBill);
    router.get('/alls', billCtrl.getAllBills);

   
    return router;
};