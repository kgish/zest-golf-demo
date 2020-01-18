import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.page.html',
    styleUrls: [ './logout.page.scss' ],
})
export class LogoutPage implements OnInit {

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
    }

    logout() {
        this.auth.logout(true);
    }

    cancel() {
        this.auth.logout(false);
    }

    get title() {
        return 'Logout';
    }
}
