import {Component, OnInit} from '@angular/core';

import {ApiService} from '../../services';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

    countries: string[];

    constructor(private api: ApiService) {
    }

    ngOnInit(): void {
        this.api.countries().subscribe(countries => this.countries = countries);
    }

    get title() {
        return 'Home';
    }

    onClick(country: string): void {

    }
}
