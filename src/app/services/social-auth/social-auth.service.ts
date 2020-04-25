import { Injectable } from '@angular/core';
import { UiService } from '../ui.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { FirebaseAuthService } from '../firebase/firebase-auth.service';
import { take } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {

  private loader:any = null;
  constructor(
    private platform: Platform,
    private facebook : Facebook,
    private googlePlus: GooglePlus,
    private uiService: UiService,
    private firebaseAuthService: FirebaseAuthService
    ) { }

  // Facebook plugin authentication

  facebookAuth() {

    return new Promise((resolve,reject)=>{

     this.showLoader('Facebook login...').then(() => {

      this.facebook.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        if (res)
          this.facebookLogin(res.authResponse.accessToken, resolve);
      })
      .catch(e => {

        let error = e.errorMessage || e;

        if (this.platform.is('android') && e == 12501)
          error = "User cancelled dialog"

        this.uiService.showToaster(error);
        this.dismissLoader()
      });
    });
    });
  }

  facebookLogin(token, resolve) {

    let observable: any = this.firebaseAuthService.facebookLogin(token);
    observable = this.uiService.pipeErrorHandeler(observable);

    observable.pipe(take(1)).subscribe((success) => {
      this.dismissLoader();
      resolve();
    }, (error) => this.dismissLoader());
  }

  // Google plugin authentication

  googleAuth() {

    return new Promise((resolve,reject)=>{
     this.showLoader('Google login...').then(() => {

      // Here attach your webclient id 
      this.googlePlus.login({
        'webClientId': '<Web_client_id>',     
        'offline': false
      }).then((res) => {
        if (res)
          this.googleLogin(res.accessToken, resolve)

      }).catch((e) => {
        let error = e.errorMessage || e;

        if (this.platform.is('android') && e == 12501) {
          error = "User cancelled dialog"
        }
        this.uiService.showToaster(error);
        this.dismissLoader()
      });
     });
    });
  }

  private googleLogin(token, resolve) {

    console.log('token',token);

    let observable: any = this.firebaseAuthService.googleLogin(token);
    observable = this.uiService.pipeErrorHandeler(observable);

    observable.pipe(take(1)).subscribe((success) => {
      resolve();
      this.dismissLoader()
    }, (error) => this.dismissLoader());
  }

  showLoader(msg) {
    return new Promise((resolve, reject) => {
      this.uiService.getLoader(msg || 'Please wait...').then((loader) => {
        this.loader = loader;
        this.loader.present();
        resolve();
      }).catch(() => resolve());
    })
  }

  dismissLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }
}
