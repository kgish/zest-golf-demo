import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: [ 'home.page.scss' ],
})
export class HomePage implements OnInit {

    name: string;

    constructor(private auth: AuthService) {
    }

    ngOnInit(): void {
        const currentUser = this.auth.getCurrentUser();
        this.name = currentUser ? (currentUser.firstName || currentUser.username ) : '';
    }
    get title() {
        return 'Home';
    }
}
