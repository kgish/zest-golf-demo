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
        this.country = this.route.snapshot.paramMap.get('id');
        this._getFacilities(true);
    }

    toggleConnected($event: CustomEvent) {
        this._getFacilities($event.detail.checked);
    }

    onClick(facility: IFacility) {
        this.router.navigate([ '/facility', facility.id ]);
    }

    get title() {
        return this.country;
    }

    // Private

    _getFacilities(connected: boolean) {
        this.api.facilities(this.country, connected).subscribe(facilities => this.facilities = facilities);
    }
}
