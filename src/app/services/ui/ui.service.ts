import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UiService {

    private isLoading: boolean;

    constructor(private toastController: ToastController,
                private loadingController: LoadingController
    ) {
    }

    showToast(message: string, duration: number = 5000) {
        this.toastController.create({
            message,
            duration,
            animated: true,
            showCloseButton: true,
            closeButtonText: 'OK',
            color: 'dark',
            position: 'top'
        }).then(toast => toast.present());
    }

    showLoading(message: string = 'Loading ...'): void {
        if (!this.isLoading) {
            this.isLoading = true;
            this.loadingController.create({
                message,
                spinner: 'bubbles'
            }).then((res) => {
                res.present();
                res.onDidDismiss().then(() => this.isLoading = false);
            });
        }
    }

    hideLoading(): void {
        if (this.isLoading) {
            this.loadingController.dismiss();
        }
    }
}
