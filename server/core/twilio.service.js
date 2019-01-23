// 'use strict';

// let CONFIG      = require('../app.config');
// const client    = require('twilio')(CONFIG.twilio.accountSID, CONFIG.twilio.authToken);

// module.exports = {
//     sendMessage : sendMessage,
//     addPhoneNo  : addPhoneNo
// };

// function sendMessage(to, msg){
//     return new Promise( (resolve, reject) => {
//         client.messages.create({
//             to: to,
//             from: CONFIG.twilio.twilioPhoneNo,
//             body: msg
//         }).then( message => {
//             resolve(message)
//         }, err => {
//             reject(err);
//         });
//     });
// };

// // Need to declare api path which update the status of phone no is valid or not in our application
// function addPhoneNo(phoneNo, name){
//     return new Promise( (resolve, reject) => {
//         client.validationRequests.create({
//            friendlyName: name,
//            phoneNumber: phoneNo
//          }).then(validation_request => {
//           console.log("Success : ",validation_request.friendlyName);
//           resolve(validation_request);
//         }, error => {
//             console.log("Error : ",error);
//             reject(error);
//         });
//     });     
// };


