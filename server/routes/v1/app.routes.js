'use strict';
let express             = require('express');
let router              = express.Router();
let auth                = require('../../core/auth.service');
let userRoutes          = require('../../apis/v1/user/user.routes')();
let menuRoutes          = require('../../apis/v1/menu/menu.routes')();
// let billRoutes          = require('../../apis/v1/bill/bill.routes')();
let branchRoutes        = require('../../apis/v1/branch/branch.routes')();
let empCategoryRoutes   = require('../../apis/v1/employee/employee.routes')();

module.exports = function (){

    // :: Prefix Path --- '/api/v1'
    router.use('/user', userRoutes);
    router.use('/menu', menuRoutes);
    // router.use('/menu', billRoutes);
    router.use('/branch',   branchRoutes); //auth.isAdmin,
    router.use('/employee', empCategoryRoutes); //auth.isAtleastManager,
    
    return router;
};

