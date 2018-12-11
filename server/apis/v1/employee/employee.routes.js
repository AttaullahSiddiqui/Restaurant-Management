'use strict';

let express             = require('express');
let empCategoryCtrl     = require('./employee-category.controller');
let service             = require('../../../core/app.service');

let router  = express.Router();

module.exports = function (){

    // :: Prefix Path --- '/api/v1/employee' 

    /* Employees Category API*/
    router.get('/category/all',             empCategoryCtrl.getAllCategories);
    router.post('/category/new',            empCategoryCtrl.createCategory);
    router.put('/category/update',          empCategoryCtrl.updateCategory);
    router.delete('/category/remove',       empCategoryCtrl.removeCategory);
   
    return router;
};