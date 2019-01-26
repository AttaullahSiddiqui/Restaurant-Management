db.createCollection("users", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "userName", "password", "mobileNo", "mobileNoVerfied", "accountApproved", "accountStatus", "createAt" ],
          properties: {
            name: {
                bsonType: "string",
                description: "must be a string"
             },
             userName: {
                bsonType: "string",
                description: "must be a string and is required"
             },
             password: {
                bsonType: "string",
                description: "must be a string and isrequired"
             },
             role: {
                enum: [ '1', ],
                description: "can only be one of the enum values"
             },
             mobileNo: {
                bsonType: "int",
                description: "must be a double and is required"
             },
             mobileNoVerfied : {
                bsonType: "bool",
                description: "must be a string and is required"
             },
             accountApproved : {
                enum: [ '1', '2', '3' ],
                description: "must be a string and is required"
             },
             accountStatus: {
                bsonType: "bool",
                description: "must be a string and is required"
             },
             employeeId : {
                bsonType: "objectId",
                description: "must be a string"
             },
             createAt: {
                bsonType: "date",
                description: "must be a string and is required"
             }
          }
       }
    }
 })

//  :: Run script when collection created ::
// db.users.createIndex( { employeeId : 1 }, { unique: true, sparse: true } )


//  minimum: 5,
//                 maximum: 3017,