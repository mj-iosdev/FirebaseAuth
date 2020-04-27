import { Component, OnInit } from '@angular/core';
import { UiService } from '../services/ui.service';
import { SocialAuthService } from '../services/social-auth/social-auth.service';
import { NavController } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';


@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.page.html',
  styleUrls: ['./phone-auth.page.scss'],
})
export class PhoneAuthPage implements OnInit {

  phoneNumber = null;
  code = '';
  isCodeAvail = false;
  applicationVarifier: any;
  userAuthConfig: any = {};

  constructor(
    private uiService: UiService,
    private navCtrl: NavController,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit() {
  }

  // This method used for send varification code(OTP)
  sendVarificationCode() {

    if (!this.phoneNumber || this.phoneNumber.length < 10)
      return this.uiService.showToaster("Enter valid phone number at least 10 digit");
    const phone = '+91' + this.phoneNumber;
    
    this.socialAuthService.varifyPhoneNumber(phone).then((data)=>{
      console.log('data',data);
      let navigationOption: NavigationOptions = {
        queryParams: {
          verificationId: data,
          phonenumber: phone,
        }
      }
      this.navCtrl.navigateForward('otp-varification', navigationOption);
    });
  }

  dismmissLoader(loader) {
    if (loader)
      loader.dismiss();
  }

}
