import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
        private router: Router,
        private http: HttpClient
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
        if (!this.facility.logo) {
            this.facility.logo = '/assets/images/golf-course-1-logo.jpg';
        } else {
            this.http.get(this.facility.logo).subscribe(
                () => {},
                () => this.facility.logo = '/assets/images/golf-course-1-logo.jpg'
            );
        }
        if (!this.facility.images || !this.facility.images.length) {
            this.facility.images = [
                '/assets/images/golf-course-1.1.jpg',
                '/assets/images/golf-course-1.2.jpg',
                '/assets/images/golf-course-1.3.jpg'
            ];
        }
    }
}
