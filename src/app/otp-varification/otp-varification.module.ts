import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpVarificationPageRoutingModule } from './otp-varification-routing.module';

import { OtpVarificationPage } from './otp-varification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpVarificationPageRoutingModule
  ],
  declarations: [OtpVarificationPage]
})
export class OtpVarificationPageModule {}
