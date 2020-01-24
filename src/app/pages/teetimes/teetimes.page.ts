import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ITeetime } from '../../services/api/api.models';
import { ApiService } from '../../services/api';

@Component({
    selector: 'app-teetimes',
    templateUrl: './teetimes.page.html',
    styleUrls: [ './teetimes.page.scss' ],
})
export class TeetimesPage implements OnInit {

    teetimes: ITeetime[] = [];
    date: string;

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private router: Router
    ) {
    }

    ngOnInit() {
        const facilityId = +this.route.snapshot.paramMap.get('id');
        this.api.teetimes(facilityId).subscribe(teetimes => {
            this.teetimes = teetimes;
            if (teetimes && teetimes.length) {
                this.date = teetimes[0].time.substr(0, 10);
            }
        });
    }

    get title() {
        return 'Teetimes';
    }

    onClick(teetime: ITeetime) {

    }
}
