
'use strict';


module.exports = {
    extendObject            : extendObject,
    extendDate              : extendDate,
    convertToDate           : convertToDate,
    convertToGMT            : convertToGMT,
    toLower                 : toLower,
    validateArray           : validateArray,
    MongooseErrorMessages   : MongooseErrorMessages,
    mappingModel            : mappingModel,
    isNullOrUndefined       : isNullOrUndefined
}

function extendObject(targetObj, sourceObj){
    for(var i in sourceObj){
        targetObj[i] = sourceObj[i];
    }
    return targetObj;
}

        //Extend current Date to supplied days & return timestamp
function extendDate(days){
    var date = new Date();
    return date.setDate(date.getDate()+days);
}

        //Convert Time stamp into Date
function convertToDate(timeStamp){
    return new Date(timeStamp);
}

        //Covert Date into GMT
function convertToGMT(date){
    return new Date().toUTCString();
}

        // Convert String into Lower Case
function toLower(data) {
    return data.toLowerCase();
}

        // Validate Regular expression pattern
function validateRegularExpression(data, pattern) {
    return pattern.test(data)
}

function validateArray(arr){
    return arr !== (null || undefined || '')
}
        //Fetch Error msg of mongoose
function MongooseErrorMessages(err){
    return Object.keys(err.errors).map(function(key){
        return err.errors[key] = err.errors[key].message;
    })
}

function mappingModel(obj, model){
    let hashObj = {};
    Object.keys(obj).forEach(function(key){
        if(model.hasOwnProperty(key)){
            hashObj[model[key]] = obj[key];
        }
    });
    return hashObj;
};

function isNullOrUndefined(value){
    if(value === undefined || value === null){
        return true;
    }
    return false;
};