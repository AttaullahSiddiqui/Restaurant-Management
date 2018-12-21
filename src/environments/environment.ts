// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl : 'http://localhost:5000/api/v1/',
  firebase : {
    apiKey: "AIzaSyCVDjxdz9o_dWYxiHc7A0B6drXWwZdVy4I",
    authDomain: "dua-restaurant-management.firebaseapp.com",
    databaseURL: "https://dua-restaurant-management.firebaseio.com",
    projectId: "dua-restaurant-management",
    storageBucket: "dua-restaurant-management.appspot.com",
    messagingSenderId: "126804868951"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
