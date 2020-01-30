import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HotelsComponent } from './hotels/hotels.component';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        HotelsComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        HotelsComponent
    ]
})
export class SharedModule {
}
