import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: [ 'home.page.scss' ]
})
export class HomePage implements OnInit {

    countries: string[];

    constructor(private api: ApiService, private router: Router) {
    }

    ngOnInit(): void {
        this.api.countries(true).subscribe(countries => this.countries = countries);
    }

    get title() {
        return 'Home';
    }

    toggleConnected($event: CustomEvent) {
        this.api.countries($event.detail.checked).subscribe(countries => this.countries = countries);
    }

    onClick(country: string): void {
        this.router.navigate([ 'country', country ]);
    }
}
