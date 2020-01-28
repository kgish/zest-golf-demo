import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsPageRoutingModule } from './bookings-routing.module';

import { BookingsPage } from './bookings.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        IonicModule,
        BookingsPageRoutingModule
    ],
    declarations: [ BookingsPage ]
})
export class BookingsPageModule {
}
