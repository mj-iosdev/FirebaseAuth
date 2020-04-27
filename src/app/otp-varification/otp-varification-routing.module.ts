import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpVarificationPage } from './otp-varification.page';

const routes: Routes = [
  {
    path: '',
    component: OtpVarificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpVarificationPageRoutingModule {}
