'use strict';

let express     = require('express');
let menuCtrl    = require('./menu.controller');

let router  = express.Router();

module.exports = function (){

    // :: Prefix Path --- '/api/v1/menu' 

    /* Menu API*/
    router.get('/',                     menuCtrl.getMenu);
    router.post('/category/new',       menuCtrl.createMenuCategory);
    router.put('/category/update',     menuCtrl.updateMenuCategory);
    router.delete('/category/remove',  menuCtrl.removeMenuCategory);
    router.post('/item/new',       menuCtrl.createMenuItem);
    router.put('/item/update',     menuCtrl.updateMenuItem);
    router.delete('/item/remove',  menuCtrl.removeMenuItem);

   
    return router;
};