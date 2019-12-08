import { async } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { FirebaseAuthService } from "./../../services/firebase/firebase-auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.page.html",
  styleUrls: ["./reset-password.page.scss"]
})
export class ResetPasswordPage implements OnInit {
  public resetPasswordForm: FormGroup;

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngOnInit() {}

  resetPassword(resetPasswordForm: FormGroup): void {
    if (!resetPasswordForm.valid) {
      console.log("Form not valid: ", resetPasswordForm.value);
    } else {
      const email: string = resetPasswordForm.value.email;
      this.firebaseAuthService.resetPassword(email).then(
        async () => {
          this.alertCtrl
            .create({
              message: "Check your email for a password reset link",
              buttons: [
                {
                  text: "Ok",
                  role: "cancel",
                  handler: () => {
                    this.router.navigateByUrl("login");
                  }
                }
              ]
            })
            .then(alert => {
              alert.present();
            });
        },
        async error => {
          this.alertCtrl
            .create({
              message: error.message,
              buttons: [{ text: "ok", role: "cancel" }]
            })
            .then(alert => {
              alert.present();
            });
        }
      );
    }
  }
}
