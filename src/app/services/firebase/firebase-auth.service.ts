import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import "firebase/firestore";

@Injectable({
  providedIn: "root"
})
export class FirebaseAuthService {
  constructor(private fireAuth: AngularFireAuth) {}

  // This method is used for Login user with Email and Password

  loginUser({ email, password }): Promise<firebase.auth.UserCredential> {
    console.log(email);
    console.log(password);

    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // This method is used for Signup user with Email and Password
  // It will store the email in Database

  signupUser({ email, password }): Promise<firebase.auth.UserCredential> {
    return this.fireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredentials: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredentials.user.uid}`)
          .set({ email });

        return newUserCredentials;
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  }

  // This method is used for Logout user

  logoutUser(): Promise<void> {
    return this.fireAuth.auth.signOut();
  }

  // This method is used for Reset password based on email

  resetPassword(email: string): Promise<void> {
    return this.fireAuth.auth.sendPasswordResetEmail(email);
  }
}
