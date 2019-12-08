# FirebaseAuth
This is a demo project with use of AngularFire to Authenticate Firebase User with Email and Password

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

## To do

- [x] Add Authentication with Email and Password
- [ ] Add Authentication with Facebook
- [ ] Add Authentication with Google
- [ ] Add Authentication with twitter
