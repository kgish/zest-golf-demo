import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeetimesPageRoutingModule } from './teetimes-routing.module';

import { TeetimesPage } from './teetimes.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        TeetimesPageRoutingModule
    ],
    declarations: [ TeetimesPage ]
})
export class TeetimesPageModule {
}
