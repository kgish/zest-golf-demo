import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacilityPageRoutingModule } from './facility-routing.module';

import { FacilityPage } from './facility.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FacilityPageRoutingModule,
        SharedModule
    ],
    declarations: [ FacilityPage ]
})
export class FacilityPageModule {
}
