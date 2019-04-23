import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private toastController: ToastController,
              private alertController: AlertController) { }

  async showToast(message: string, timeSec?: number) {
    const toast = await this.toastController.create({
      message: message || '',
      duration: timeSec || 2000
    });
    toast.present();
  }

  async showConfirmAlert(header: string, subHeader?: string, message?: string, btnTxt?: string) {
    const alert = await this.alertController.create({
      header: header || '',
      subHeader: subHeader || '',
      message: message || '',
      buttons: [ btnTxt || 'Ok' ]
    });

    return await alert.present();
  }
}
