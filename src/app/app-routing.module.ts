import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
        canActivate: [ AuthGuard ]
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'logout',
        loadChildren: () => import('./pages/logout/logout.module').then(m => m.LogoutPageModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [ AuthGuard ]
    },
    {
        path: 'help',
        loadChildren: () => import('./pages/help/help.module').then(m => m.HelpPageModule)
    },
    {
        path: 'about',
        loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
    },
    {
        path: 'country/:id',
        loadChildren: () => import('./pages/country/country.module').then(m => m.CountryPageModule)
    },
    {
        path: 'facility/:id',
        loadChildren: () => import('./pages/facility/facility.module').then(m => m.FacilityPageModule)
    },
    {
        path: 'teetimes/:id',
        loadChildren: () => import('./pages/teetimes/teetimes.module').then(m => m.TeetimesPageModule)
    },
    {
        path: 'booking/:id',
        loadChildren: () => import('./pages/booking/booking.module').then(m => m.BookingPageModule)
    },
    {
        path: 'bookings',
        loadChildren: () => import('./pages/bookings/bookings.module').then(m => m.BookingsPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
