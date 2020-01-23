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

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private router: Router
    ) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.api.teetimes(id).subscribe(teetimes => this._init(teetimes), error => console.error(error));
    }

    get title() {
        return 'Teetimes';
    }

    // Private

    private _init(teetimes: ITeetime[]) {
        console.log(teetimes);
        this.teetimes = teetimes;
    }
}
