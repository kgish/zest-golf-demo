import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';
import { CountryPageRoutingModule } from './country-routing.module';

import { CountryPage } from './country.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CountryPageRoutingModule,
        SharedModule
    ],
    declarations: [ CountryPage ]
})
export class CountryPageModule {
}
