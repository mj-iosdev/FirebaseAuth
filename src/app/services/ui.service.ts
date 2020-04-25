import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  public showToaster(message) {

    this.toastCtrl.create({
      message: message,
      duration: 2000

    }).then((success) => {
      success.present();
    }).catch(() => { });
  }

  getLoader(message) {

    return this.loadingCtrl.create({
      message: message,
    });
  }

  public pipeLoader(observable: Observable<any>, message) {

    let loader = null;
    let isDismissed = false;

    this.getLoader(message).then((tempLoader: any) => {
      loader = tempLoader;
      if (!isDismissed) loader.present();
    });

    return observable.pipe(
      mergeMap(data => {
        return new Promise((resolve, reject) => {
          isDismissed = true;
          if (loader) {
            loader.dismiss().then(() => {
              resolve(data);
            });
          } else {
            resolve(data);
          }
        });
      }),
      catchError(err => {
        return new Promise((resolve, reject) => {
          isDismissed = true;
          if (loader) {
            loader.dismiss().then(() => {
              reject(err);
            });
          } else {
            reject(err);
          }
        });
      })
    );
  }


  public pipeErrorHandeler(observable: Observable<any>) {
    return observable.pipe(
      mergeMap(data => {
        return new Promise((resolve, reject) => {
          resolve(data)
        });
      }),
      catchError(err => {
        return new Promise((resolve, reject) => {
          this.showToaster(err.message || err.error || err);
          reject(err);
        });
      })
    );
  }
}
