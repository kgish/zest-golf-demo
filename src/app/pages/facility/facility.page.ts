import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IFacility } from '../../services/api/api.models';
import { ApiService } from '../../services/api';

@Component({
    selector: 'app-facility',
    templateUrl: './facility.page.html',
    styleUrls: [ './facility.page.scss' ],
})
export class FacilityPage implements OnInit {

    facility: IFacility;

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private router: Router
    ) {
    }

    ngOnInit() {
        const facilityId = this.route.snapshot.paramMap.get('id');
        this.api.facility(facilityId, true).subscribe(facility => this._init(facility));
    }

    onClick() {
        this.router.navigate([ '/teetimes', this.facility.id ]);
    }

    get title() {
        return 'Facility';
    }

    // Private

    private _init(facility: IFacility) {
        this.facility = facility;
    }
}
