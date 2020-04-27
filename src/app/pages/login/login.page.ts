import { FirebaseAuthService } from "./../../services/firebase/firebase-auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController, AlertController, NavController } from "@ionic/angular";
import { SocialAuthService } from 'src/app/services/social-auth/social-auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor(
    private router: Router,
    private firebaseAuthService: FirebaseAuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private navCtrl : NavController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  ngOnInit() {}

  btnLoginClicked() {}

  btnRegisterClicked() {
    this.router.navigate(["/signup"]);
  }

  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log("Form not valid: ", loginForm.value);
    } else {
      this.loading = await this.loadingCtrl.create();

      await this.loading.present();

      const email = loginForm.value.email;
      const password = loginForm.value.password;

      this.firebaseAuthService.loginUser({ email, password }).then(
        () => {
          this.loading.dismiss().then(() => {
            this.navCtrl.navigateRoot("detail");
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            this.alertCtrl
              .create({
                message: error.message,
                buttons: [{ text: "Ok", role: "cancel" }]
              })
              .then(alert => {
                alert.present();
              });
          });
        }
      );
    }
  }

  // this method used yo login with phonenumber

 loginWithPhonenumber(){
  this.navCtrl.navigateForward('phone-auth');
 }

  // this method used to login with facebook

  loginWithFacebook() {
      this.socialAuthService.facebookAuth().then(()=>{
        this.navCtrl.navigateRoot("detail");
      });
  }

  // this method used to login with google

  loginWithGoogle() {
    this.socialAuthService.googleAuth().then(()=>{
      this.navCtrl.navigateRoot("detail");
    });
  }
}
