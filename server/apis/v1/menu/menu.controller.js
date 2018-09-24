'use strict';

var Menu        = require('./menu.model');
var service     = require('../../../core/app.service');
var errHandler  = require('../../../utils/errorHandler');


module.exports = {
    getMenu                 : getMenu,
    createMenuCategory      : createMenuCategory,
    updateMenuCategory      : updateMenuCategory,
    removeMenuCategory      : removeMenuCategory,
    createMenuItem          : createMenuItem,
    updateMenuItem          : updateMenuItem,
    removeMenuItem          : removeMenuItem,
};


function getMenu(req, res){
    Menu.find({}, function(err, result){
        return res.respondSuccess(result,"Fetched restaurant menu", 1);
    },function(err){
        console.log("Error : -------->",err);
        var error = errHandler.handle(err);
        return res.respondError(error[0], error[1]);
    });
}

function createMenuCategory(req, res){
    var newMenuCategory = new Menu({categoryName : req.body.name});
	newMenuCategory.save().then(function(result){
        return res.respondSuccess(null,"Menu Category created successfully", 2);
    },function(err){
        var error = errHandler.handle(err);
        return res.respondError(error[0], (error[1] || -1) );  
    });
}

function updateMenuCategory(req, res){
    if(!req.body.menuCategoryId){
        return res.respondError("Menu category id is required", -4);  
    }
    Menu.update({'_id': req.body.menuCategoryId}, {$set : { categoryName : req.body.name } } ,
                { runValidators: true }, function(err, success){
                    if(err){
                        var error = errHandler.handle(err);
                        return res.respondError(error[0], (error[1] || -1) );
                    }
                    else if(success.n){
                        return res.respondSuccess(success,"Menu category name updated successfully", 1);
                    }
                    return res.respondError("No menu category name updated", -3);
                });

}

function removeMenuCategory(req, res){
    if(!req.query.menuCategoryId){
        return res.respondError("Menu category id is required", -4);
    }
    Menu.deleteOne({'_id' : req.query.menuCategoryId}).then(function(success){
        if(success.deletedCount){
            return res.respondSuccess(success,"Menu category removed successfully", 1);
        }
        return res.respondError("Menu category not removed", -3);
    }, function(err){
        console.log("Error : -------->",err);
        return res.respondError("Unexpected Error", -1);
    }); 
}

function createMenuItem(req, res){
    try {
        var requiredFeilds = ['categoryId', 'itemName', 'price', 'quantity', 'unit'];
        var isErrors = service.validateRequiredFeilds(requiredFeilds, req.body);
        if(isErrors.length){
            return res.respondError(isErrors, -4);
        }
        Menu.update(
            {'_id': req.body.categoryId},
            { "$push": { "categoryItems": { $each : [{ 'itemName' : req.body.itemName, 'price' : req.body.price, 'quantity' : req.body.quantity, 'unit' : req.body.unit }] } } },
            { runValidators: true }).then(function(result){
            console.log("Result ---------------> ",result);
            if(result.nModified && result.n){
                return res.respondSuccess(null,"Menu category item addedd successfully", 1);
            }
            return res.respondError("No menu category item added", -3);
        },function(err){
            console.log("Error : ----------->",err);
            var error = errHandler.handle(err);
            res.respondError(error[0], (error[1] || -1) );
        });
    }
    catch(err){
        console.log("Error <---------> ",err);
        var error = errHandler.handle(err);
        return res.respondError(error[0], (error[1] || -1) );  
    }
}

function updateMenuItem(req, res){
    try {
        if(!req.body.itemId){
            return res.respondError("Category item id is required", -4);
        }

        if(req.body.categoryChange){
            return removeUpdateMenuItem(req.body, function(err, success){
                if(err){
                    return res.respondError(err, -3);  
                }
                return res.respondSuccess(null,success, 1);
            });
        }else{
            var updateFeilds = ['itemName','price','quantity', 'unit'];
            var updatedObj = service.getUpdatedHashedObj(updateFeilds, req.body, true, 'categoryItems');
            Menu.update(
                {'categoryItems._id': req.body.itemId},
                {"$set" : updatedObj }
            ).then(function(result){
                console.log("Success : ------------->",result);
                if(result.n && result.nModified){
                    return res.respondSuccess(null,"Menu Item updated successfully", 1);
                }
                res.respondError("No Menu Item updated", -3);
            },function(err){
                console.log("Error : <----------->",err);
                var error = errHandler.handle(err);
                res.respondError(error[0], (error[1] || -1) );  
            });
        }
    }
    catch(err){
        console.log("Error : ----------->",err);
        var error = errHandler.handle(err);
        res.respondError(error[0], (error[1] || -1) );  
    }
}


function removeMenuItem(req, res){
    try{
        if(!req.query.itemId){
            return res.respondError("Category item id is required", -4);
        }
        Menu.update(
            { 'categoryItems._id': req.query.itemId},
            { $pull : { "categoryItems": { _id : req.query.itemId } } }
        ).then(function(result){
            if(result.n && result.nModified){
                return res.respondSuccess(null,"Remove menu category item successfully", 1);
            }
            return res.respondSuccess("No menu category item remove", -3);
        },function(err){
            console.log("Error : ----------->",err);
            var error = errHandler.handle(err);
            return res.respondError(error[0], (error[1] || -1) );
        });
    }
    catch(err){
        var error = errHandler.handle(err);
        return res.respondError(error[0], (error[1] || -1) ); 
    }
}

function removeUpdateMenuItem(body, cb){
    Menu.update( {'categoryItems._id': body.itemId},
        { $pull : { "categoryItems": { _id : body.itemId } } }
    ).then(function(result){
        if(result.n && result.nModified){
            return Menu.update( {'_id': body.categoryId},
            { "$push": { "categoryItems": { $each : [{ 'itemName' : body.itemName, 'price' : body.price, 'quantity' : body.quantity, 'unit' : body.unit }] } } },
            { runValidators: true }).then(function(result1){
                if(result1.nModified && result1.n){
                    return cb(null, "Menu item updated successfully");
                }
                return cb("Error in update menu item");
            },function(err1){
                console.log("Error :------",err1);
                return cb("Error in update menu item");
            });
        }
        return cb("Error in update menu item");
    },function(err){
        console.log("Error :------",err);
        return cb("Error in update menu item");
    });
}