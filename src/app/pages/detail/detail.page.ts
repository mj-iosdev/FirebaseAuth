import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase/firebase-auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor( 
    private firebaseAuthService: FirebaseAuthService,
    private navCtrl: NavController
    ) { }

  ngOnInit(
   
  ) {
  }

  logout(){
   this.firebaseAuthService.logoutUser().then(()=>{
     this.navCtrl.navigateRoot('');
   })   
  }
}
