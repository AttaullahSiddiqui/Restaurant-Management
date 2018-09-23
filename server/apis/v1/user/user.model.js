let mongoose    = require('mongoose');

const ACCOUNT_STATUS = ['approved','not-approved'];
const USER_ROLES = ['owner', 'admin', 'manager', 'user'];

let userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, 'Name is required']
    },
    email : {
        type: String,
		lowercase: true,
		unique  : true,
		required : [true,"Email is required"]
    },
    password: {
		type: String,
		required : [true,"Password is required"]
	},
    status : {
        type : String,
        enum : ACCOUNT_STATUS,
        default : ACCOUNT_STATUS[0],
    },
    role : {
        type : String,
        enum : USER_ROLES,
        default: USER_ROLES[3]
    },
    picture : {
        type : String
    },
    creationDate : {
        type : Date,
        default: Date.now
    }
});

userSchema.path('email').validate( function (email) {
    let regex_email = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let isEmailValid = regex_email.test(email);
    if(isEmailValid)
    return true;
    return false;
}, "Invalid email address")


// var SALT_FACTOR = 10;

// UserSchema.pre("save", function (next) {
// 	var user = this;
// 	console.log("Is modified Password : ",this.isModified("password"));
//     if (!this.isModified("password")) {
//         return next();
// 	}
// 	bcrypt.hash(user.password, SALT_FACTOR, function(err, hash) {
// 		if (err) {
// 			console.log(":: Error in generating Hash Password : ",err);
// 			var hashError = new Error("Unexpcted error")
// 			next(hashError);
// 		}
// 		user.password = hash;
// 		next();
// 	});
// });


module.exports = mongoose.model("user", userSchema);