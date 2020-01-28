import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { IUser, Role } from './user.model';
import { UiService } from '../ui';
import { ApiService } from '../api';

const KEY_CURRENT_USER = 'current-user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    currentUserChanged = new BehaviorSubject<IUser>(null);

    private currentUser: IUser;

    constructor(private router: Router,
                private location: Location,
                private api: ApiService,
                private ui: UiService) {
    }

    remember(): void {
        const item = localStorage.getItem(KEY_CURRENT_USER);
        if (item) {
            this.currentUser = JSON.parse(item);
            this.api.countries().subscribe(
                () => {
                    this.currentUserChanged.next(this.currentUser);
                    this.router.navigate([ 'home' ]);
                },
                error => {
                    this.currentUser = null;
                    console.error(error);
                }
            );
        }
    }

    login(value: { username: string, password: string, remember: boolean }) {
        const { username, password, remember } = value;
        const token = btoa(username + ':' + password);
        this.currentUser = {
            username,
            firstName: 'Kiffin',
            lastName: 'Gish',
            email: 'kiffin.gish@planet.nl',
            phone: '123456789',
            role: Role.USER,
            token
        };
        this.api.countries().subscribe(
            () => {
                if (remember) {
                    localStorage.setItem(KEY_CURRENT_USER, JSON.stringify(this.currentUser));
                }
                this.currentUserChanged.next(this.currentUser);
                this.router.navigate([ 'home' ]);
                this.ui.showToast('Logged in successfully');
            },
            error => {
                console.error(error);
                this.currentUser = null;
                this.ui.showToast('Invalid login credential, please try again');
            }
        );
    }

    logout(b: boolean = true) {
        if (b) {
            this.ui.showLoading();
            setTimeout(() => {
                this.ui.hideLoading();
                this.currentUser = null;
                localStorage.removeItem(KEY_CURRENT_USER);
                this.currentUserChanged.next(this.currentUser);
                this.router.navigate([ 'login' ]);
                this.ui.showToast('Logged out successfully');
            }, 1000);
        } else {
            this.ui.showToast('Cancelled logout');
            this.location.back();
        }
    }

    getToken(): string {
        return this.currentUser ? this.currentUser.token : null;
    }

    getCurrentUser() {
        return this.currentUser ? { ...this.currentUser } : null;
    }
}
