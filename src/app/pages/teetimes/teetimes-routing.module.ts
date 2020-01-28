import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeetimesPage } from './teetimes.page';

const routes: Routes = [
    { path: '', component: TeetimesPage }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class TeetimesPageRoutingModule {
}
