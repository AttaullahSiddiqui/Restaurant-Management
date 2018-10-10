'use strict';

let express     = require('express');
let branchCtrl  = require('./branch.controller');

let router  = express.Router();

module.exports = function (){

    // :: Prefix Path --- '/api/v1/branch' 

    /* Menu API*/
    router.get('/all',        branchCtrl.getAllBranches);
    router.post('/new',       branchCtrl.createNewBranch);
    router.put('/update',     branchCtrl.updateBranchDetails);  // Pass branch no in query string
    router.delete('/remove',  branchCtrl.removeBranch);  // Pass branch no in query string
   
    return router;
};