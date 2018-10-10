'use strict';

let express             = require('express');
let empCategoryCtrl     = require('./employee-category.controller');
let service             = require('../../../core/app.service');

let router  = express.Router();

module.exports = function (){

    // :: Prefix Path --- '/api/v1/employees/category' 

    /* Employees Category API*/
    router.post('/new',            empCategoryCtrl.createCategory);
    router.put('/update',          empCategoryCtrl.updateCategory);
    router.get('/all',             empCategoryCtrl.getAllCategories);
    router.delete('/remove',       empCategoryCtrl.removeCategory);
   
    return router;
};