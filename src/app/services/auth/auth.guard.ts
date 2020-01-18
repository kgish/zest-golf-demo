import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

const fn = 'AuthGuard';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private router: Router,
                private auth: AuthService) {
    }

    canActivate(): boolean {
        let result = true;
        const currentUser = this.auth.getCurrentUser();
        console.log(`${fn} canActivate() currentUser='${JSON.stringify(currentUser)}'`);
        if (!this.auth.getCurrentUser()) {
            this.router.navigate([ 'login' ]);
            result = false;
        }
        console.log(`${fn} canActivate() currentUser='${JSON.stringify(currentUser)}' => '${result}'`);
        return result;
    }
}
