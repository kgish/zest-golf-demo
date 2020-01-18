import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UiService {

    constructor(private toastController: ToastController) {
    }

    showToast(message: string, duration: number = 1000) {
        this.toastController.create({
            message,
            duration,
            animated: true,
            showCloseButton: true,
            closeButtonText: 'OK',
            color: 'success',
            position: 'bottom'
        }).then(toast => toast.present());
    }
}
