import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: [ './login.page.scss' ],
})
export class LoginPage implements OnInit {

    private form: FormGroup;

    constructor(private auth: AuthService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: [ '', [ Validators.required, Validators.minLength(5) ] ],
            password: [ '', [ Validators.required, Validators.minLength(5) ] ],
        });
    }

    login() {
        this.auth.login(this.form.value);
    }

    get title() {
        return 'Login';
    }
}
