const config = {
    // MongoDB connection
    db: {
        development  : 'mongodb://localhost:27017/duarestaurant',
        //production   : 'mongodb://ghayyaspanda:panda123@ds247007.mlab.com:47007/duarestaurant'
    },
    JWT : {
        secretKey : 'hfgs97454089jbjsdfsdvf87032603jb'
    },
    twilio: {
        accountSID : 'ACf52b98a28838a65a827eca710f56b079',
        authToken : 'b1cd052b21d966b0671f16ab325b0ccb',
        twilioPhoneNo: '+18632702045'
    }
}

module.exports = config;