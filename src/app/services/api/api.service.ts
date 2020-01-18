import {Injectable} from '@angular/core';

import * as dotenv from 'dotenv';

dotenv.config();

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    url: string;
    username: string;
    password: string;

    constructor() {
        this.url = process.env.API_URL;
        this.username = process.env.API_USERNAME;
        this.password = process.env.API_PASSWORD;
    }

    countries() {

    }
}
