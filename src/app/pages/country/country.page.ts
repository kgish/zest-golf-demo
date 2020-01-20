import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IFacility } from '../../services/api/api.models';
import { ApiService } from '../../services/api';

@Component({
    selector: 'app-country',
    templateUrl: './country.page.html',
    styleUrls: [ './country.page.scss' ],
})
export class CountryPage implements OnInit {

    country: string;
    facilities: IFacility[];

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private router: Router
    ) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.country = id;
        this.api.facilities(this.country).subscribe(facilities => this.facilities = facilities);
    }

    toggleFacilities($event: CustomEvent) {
        this.api.facilities(this.country, $event.detail.checked).subscribe(facilities => this.facilities = facilities);
    }

    onClick(facility: IFacility) {
        this.router.navigate([ '/facility', facility.id ]);
    }

    get title() {
        return this.country;
    }
}
