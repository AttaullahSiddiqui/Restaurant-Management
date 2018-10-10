
module.exports = {
    handle              : handle,
    mongoErrors         : mongoErrors,
    validationErrors    : validationErrors
}

function handle(err){
    switch(err.name){
        case 'ValidationError':
            return validationErrors(err);
            break;
        case 'MongoError':
            return mongoErrors(err);
            break;
        case 'CastError':
            return castErrors(err);
        default:
            return unexpectedError(err);
    }
}

function mongoErrors(err){
    var errors = [];
    try{
        if(err.code && err.code == 11000){
            var msg = err.errmsg.split('_1 dup key');
            msg = msg[0];
            msg = msg.split(' ');
            var propertyName = msg[msg.length-1];
            errors.push("This "+propertyName+" is already in use.");
            return [errors, -6];
        }
    }catch(error){
        console.log("Unexpected Error : -------------> ",err);
        errors.push("Unexpected Error");
        return [errors, -1];
    } 
}

function validationErrors(err){
    try{
        var errors = [];
        for(var propertyName in err.errors){
            errors.push(err.errors[propertyName].message);
        }
        return [errors, -4];
    }catch(error){
        var errors = [];
        console.log("Unexpected Error : -------------> ",err);
        errors.push("Unexpected Error");
        return [errors, -1];
    }
}

function castErrors(err){
    console.log("Cating Error : -------------> ",err);
    var errors = ["Cast to embedded failed. Please provide correct values"];
    return [errors, -4];
}


function unexpectedError(err){
    console.log("Unexpected Error : -------------> ",err);
    var errors = ["Unexpected Error"];
    return [errors, -1];
}