import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFacility } from '../../services/api/api.models';
import { ApiService } from "../../services/api";

@Component({
    selector: 'app-country',
    templateUrl: './country.page.html',
    styleUrls: [ './country.page.scss' ],
})
export class CountryPage implements OnInit {

    title: string;
    facilities: IFacility[];

    constructor(private route: ActivatedRoute, private api: ApiService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.title = id;
        this.api.facilities(id).subscribe(facilities => this.facilities = facilities);
    }

    onClick(facility: IFacility) {

    }
}
