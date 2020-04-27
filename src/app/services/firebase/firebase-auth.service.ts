import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { Observable, Observer } from 'rxjs';

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

  // This method used for facebook login

  public facebookLogin(token) {
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(token);

    return new Observable((observer: Observer<any>) => {
      this.fireAuth.auth.signInWithCredential(facebookCredential).then((data) => {
        observer.next(data);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  //This method used for google login

  public googleLogin(token) {
    const googleCredential = firebase.auth.GoogleAuthProvider.credential(null, token);

    return new Observable((observer: Observer<any>) => {
      this.fireAuth.auth.signInWithCredential(googleCredential).then((data) => {
        observer.next(data);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  // This method used for varify OTP
  varifyOTP(code: string, verificationId: string) {

    return new Observable((observer: Observer<any>) => {

      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
      this.fireAuth.auth.signInAndRetrieveDataWithCredential(credential).then((data) => {

        observer.next(data);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
        observer.complete();
      });
    })
  }
}
