# FirebaseAuth
This is a demo project with use of AngularFire to Authenticate Firebase User with different methods provided by Firebase.

This project was built using [AngularFire](https://github.com/angular/angularfire).

## How to use

1. To run the project
  
  ```
  npm install
  ```
  
2. Create a Firebase project 
  
  [Firebase](https://console.firebase.google.com/)
  
3. Add config object from Firebase Webapp in to /src/app/services/firebase/firebase-config.ts
  
  ```
  var config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
};
``` 

## Google authentication

1. Create Android and ios platform from firebase project setting 

2. Download google-service.json and googleService-info.plist file and add both file project root folder.

3. Enable google authentication and get web_client id. [ web_client id used in social-auth.service(firebase-auth/Repo/src/app/services/social-auth/social-auth.service.ts) ]

4. Integrate google plugin

 - ionic cordova plugin add cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=myreversedclientid --variable WEB_APPLICATION_CLIENT_ID=mywebapplicationclientid


## Facebook authentication with firebase

1. Create facebook app using facebook devloper account.

2. Add android and ios platform on facebook app.

2. Enable facebook authentication and set facebook app id and secrate key.

3. Integrate facebook plugin

    -  ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="123456789" --variable APP_NAME="myApplication"

## Phone number authentication with firebase

1. Enable phone number authentication

## Resolve conflict between google-plus and firebase-authentication plugin

* Android Platform 
1. Add google-service.json file 
   path : platforms/android/app/google-services.json

2. Add following plugins
- ionic cordova plugin add cordova-plugin-androidx
- ionic cordova plugin add cordova-plugin-androidx-adapter

* IOS Platform : 
=> Add GoogleService-info.plist in Xcode 
  Path : MyApp/resources/GoogleService-info.plist


## To do

- [x] Add Authentication with Email and Password
- [x] Add Authentication with Facebook
- [x] Add Authentication with Google
- [x] Add Authentication with Phone number
- [ ] Add Authentication with Twitter
