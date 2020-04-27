import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase/firebase-auth.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UiService } from '../services/ui.service';
import { SocialAuthService } from '../services/social-auth/social-auth.service';

@Component({
  selector: 'app-otp-varification',
  templateUrl: './otp-varification.page.html',
  styleUrls: ['./otp-varification.page.scss'],
})
export class OtpVarificationPage implements OnInit {

  code = '';
  verificationId:any = '';
  phoneNumber = '';

    constructor(
      private activateRoute: ActivatedRoute,
      private navCtrl: NavController,
      private uiService: UiService,
      private firebaseAuthService: FirebaseAuthService,
      private socialAuthService: SocialAuthService
    ) {
      this.activateRoute.queryParams.subscribe((data) => {
        if (data) {
          this.verificationId = data.verificationId;
          this.phoneNumber = data.phonenumber;
        }
      })
    }

  ngOnInit() {
  }

  resend() {
    this.socialAuthService.varifyPhoneNumber(this.phoneNumber).then((data)=>{
        this.uiService.showToaster('Successfully sent OTP');
        this.verificationId = data;
    }).catch((error) => {
      this.uiService.showToaster(error);
    });
  }

  varify() {

    let code: string = this.code;
    if (!code)
      return this.uiService.showToaster("Enter varification code");
    this.varifyCode(code);;
  }

  // This method used for varify code.

  varifyCode(code){
    let observable = this.firebaseAuthService.varifyOTP(code, this.verificationId)
    observable = this.uiService.pipeLoader(observable, 'Verify OTP...');
    observable = this.uiService.pipeErrorHandeler(observable);
    observable.subscribe((data) => {

      this.navCtrl.navigateRoot("detail");
      this.code = '';
    }, (error) => {
      this.code = '';
    })
  }
}
