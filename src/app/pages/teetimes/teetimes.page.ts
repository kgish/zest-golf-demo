import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Holes, ITeetime, Players } from '../../services/api/api.models';
import { ApiService } from '../../services/api';

@Component({
    selector: 'app-teetimes',
    templateUrl: './teetimes.page.html',
    styleUrls: [ './teetimes.page.scss' ],
})
export class TeetimesPage implements OnInit, OnDestroy {

    teetimes: ITeetime[] = [];
    subscription: Subscription;

    facilityId: number;
    bookingDate: Date;
    players: Players;
    holes: Holes;

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.facilityId = +this.route.snapshot.paramMap.get('id');
        this.subscription = this.route.queryParamMap.subscribe(params => {
                const bookingDate = params.get('bookingDate') || new Date();
                this.bookingDate = new Date(bookingDate);
                this.players = params.get('players') as Players || '2';
                this.holes = (params.get('holes') as any || '18') as Holes;

                this.api.teetimes(this.facilityId, this.bookingDate, this.players, this.holes).subscribe(teetimes => {
                    this.teetimes = teetimes.sort();
                });
            }
        );
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    get title() {
        return 'Teetimes';
    }

    clickTeetime(teetime: ITeetime) {

    }

    setDate(offset) {
        console.log(offset);
        const bookingDate = new Date(this.bookingDate);
        bookingDate.setDate(bookingDate.getDate() + offset);

        const queryParams = { bookingDate, players: this.players, holes: this.holes };
        this.router.navigate([ '/teetimes', this.facilityId ], { queryParams });
    }
}
