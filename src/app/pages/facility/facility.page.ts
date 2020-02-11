import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';
import { ApiService, IFacility } from '../../services';

@Component({
    selector: 'app-facility',
    templateUrl: './facility.page.html',
    styleUrls: [ './facility.page.scss' ],
})
export class FacilityPage implements OnInit {

    facility: IFacility;
    googleUrl: SafeUrl;

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private router: Router,
        private sanitizer: DomSanitizer,
        private http: HttpClient
    ) {
    }

    ngOnInit() {
        const facilityId = this.route.snapshot.paramMap.get('id');
        this.api.facility(facilityId, true).subscribe(
            facility => this._init(facility),
            error => console.error(error)
        );
    }

    onClick() {
        this.router.navigate([ 'teetimes', this.facility.id ]);
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
                () => {
                },
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

        const address = facility.address;
        let query = '';
        let count = 0;
        [ 'address1', 'address2', 'number', 'addition' ].forEach(name => {
            if (address[name]) {
                query += `${count ? ' ' : ''}${address[name]}`;
                count++;
            }
        });
        [ 'zipcode', 'place', 'state', 'country' ].forEach(name => {
            if (address[name]) {
                query += `${count ? ', ' : ''}${address[name]}`;
                count++;
            }
        });
        console.log(`query='${query}'`);
        query = encodeURIComponent(query);
        this.googleUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.google.com/maps/embed/v1/place?q=${query}&key=${environment.googleKey}`
        );
    }


}
