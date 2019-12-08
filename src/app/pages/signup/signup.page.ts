import { AlertController } from "@ionic/angular";
import { FirebaseAuthService } from "./../../services/firebase/firebase-auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"]
})
export class SignupPage implements OnInit {
  username: string = "";
  password: string = "";
  confirm_password: string = "";
  public signupForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor(
    private router: Router,
    private firebaseAuthService: FirebaseAuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.signupForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  ngOnInit() {}

  btnSignupClicked() {
    const { username, password, confirm_password } = this;
  }

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log(
        "Need to complete the form, current value: ",
        signupForm.value
      );
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();

      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;

      this.firebaseAuthService.signupUser({ email, password }).then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl("detail");
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
}
