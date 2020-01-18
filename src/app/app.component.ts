import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services';

type When = 'logged-in' | 'logged-out';

interface IAppPage {
    title: string;
    url: string;
    icon: string;
    when: When[];
}

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {
    filteredAppPages: IAppPage[];

    private subscriptions: Subscription[] = [];

    private appPages: IAppPage[] = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home',
            when: [ 'logged-in' ]
        },
        {
            title: 'Profile',
            url: '/profile',
            icon: 'person',
            when: [ 'logged-in' ]
        },
        {
            title: 'About',
            url: '/about',
            icon: 'information-circle',
            when: [ 'logged-in', 'logged-out' ]
        },
        {
            title: 'Help',
            url: '/help',
            icon: 'help-circle',
            when: [ 'logged-in', 'logged-out' ]
        },
        {
            title: 'Login',
            url: '/login',
            icon: 'log-in',
            when: [ 'logged-out' ]
        },
        {
            title: 'Logout',
            url: '/logout',
            icon: 'log-out',
            when: [ 'logged-in' ]
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private auth: AuthService
    ) {
        this.initializeApp();
    }

    ngOnInit(): void {
        this.subscriptions.push(this.auth.currentUserChanged.subscribe(currentUser =>
            this.filteredAppPages = this.appPages.filter(page =>
                page.when.includes(currentUser ? 'logged-in' : 'logged-out')
            )
        ));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => {
            if (subscription) {
                subscription.unsubscribe();
            }
        });
        this.subscriptions = [];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
