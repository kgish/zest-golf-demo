import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

import {IUser, Role} from './user.model';
import {UiService} from '../ui';
import {ApiService} from '../api';

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

    login(value: { username: string, password: string }) {
        const {username, password} = value;
        this.currentUser = {username, role: Role.USER, token: btoa(username + ':' + password)};
        this.api.countries().subscribe(
            () => {
                this.currentUserChanged.next(this.currentUser);
                this.router.navigate(['home']);
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
            this.currentUser = null;
            this.currentUserChanged.next(this.currentUser);
            this.router.navigate(['login']);
            this.ui.showToast('Logged out successfully');
        } else {
            this.ui.showToast('Cancelled logout');
            this.location.back();
        }
    }

    getToken(): string {
        return this.currentUser ? this.currentUser.token : null;
    }

    getCurrentUser() {
        return this.currentUser ? {...this.currentUser} : null;
    }
}
