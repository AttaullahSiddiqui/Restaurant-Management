'use strict';

let express             = require('express');
let empCategoryCtrl     = require('./employee-category.controller');
let employeeCtrl        = require('./employee.controller');
let service             = require('../../../core/app.service');

let router  = express.Router();

module.exports = function (){

    // :: Prefix Path --- '/api/v1/employee' 

    /* Employees Category API*/
    router.get('/category/all',             empCategoryCtrl.getAllCategories);
    router.post('/category/new',            empCategoryCtrl.createCategory);
    router.put('/category/update',          empCategoryCtrl.updateCategory);
    router.delete('/category/remove',       empCategoryCtrl.removeCategory);

    
    /* Employees Category API*/
    router.get('/all',             employeeCtrl.getAllEmployee);
    router.post('/new',            employeeCtrl.createEmployee);
    router.put('/update',          employeeCtrl.updateEmployee);
    router.delete('/remove',       employeeCtrl.removeEmployee);
   
    return router;
};