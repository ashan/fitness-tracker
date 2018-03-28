// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC97A0hKA6v87ZXmmjTUkiOAfsaphNjbDs",
    authDomain: "ng-fitness-tracker-12cf7.firebaseapp.com",
    databaseURL: "https://ng-fitness-tracker-12cf7.firebaseio.com",
    projectId: "ng-fitness-tracker-12cf7",
    storageBucket: "ng-fitness-tracker-12cf7.appspot.com",
    messagingSenderId: "384518793866"
  }
};
