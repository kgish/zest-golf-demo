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
        const id = this.route.snapshot.paramMap.get('id');
        this.api.facility(id, true).subscribe(facility => this.facility = facility);
    }

    get title() {
        return 'Facility';
    }
}
