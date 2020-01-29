import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ApiService, Holes, IBooking, ITeetime, Players } from '../../services/api';

@Component({
    selector: 'app-teetimes',
    templateUrl: './teetimes.page.html',
    styleUrls: [ './teetimes.page.scss' ],
})
export class TeetimesPage implements OnInit, OnDestroy {

    teetimes: ITeetime[] = [];
    bookings: IBooking[] = [];
    subscription: Subscription;

    facilityId: number;
    bookingDate: Date;
    players: Players;
    holes: Holes;

    private offset = 0;

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

                this.api.teetimes(this.facilityId, this.bookingDate, this.players, this.holes).subscribe(teetimes =>
                    this.teetimes = teetimes.sort((a, b) => a.time === b.time ? 0 : a.time < b.time ? -1 : 1)
                );
                this.api.bookings(this.bookingDate).subscribe(bookings =>
                    this.bookings = bookings.sort((a, b) => a.teetime === b.teetime ? 0 : a.teetime < b.teetime ? -1 : 1)
                );
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

    teetimesShift(shift: string): ITeetime[] {
        const range = {
            morning: { from: 0, to: 12 },
            afternoon: { from: 12, to: 18 },
            evening: { from: 18, to: 24 }
        }[shift];
        return this.teetimes.filter(tt => this._isBetween(tt, range.from, range.to));
    }

    bookTeetime(teetime: ITeetime) {
        const queryParams = { teetime: teetime.time, players: this.players, holes: this.holes, teeId: teetime.id };
        this.router.navigate([ 'booking', this.facilityId ], { queryParams });
    }

    changeDate(offset) {
        if (!(this.offset === 0 && offset === -1)) {
            this.offset += offset;
            this.bookingDate.setDate((new Date(this.bookingDate)).getDate() + offset);
            this._resetParams();
        }
    }

    changePlayers($event: CustomEvent) {
        this.players = $event.detail.value;
        this._resetParams();
    }

    changeHoles($event: CustomEvent) {
        this.holes = $event.detail.value;
        this._resetParams();
    }

    bookingDetail(booking: IBooking) {
        console.log(booking);
    }

    // Private

    private _resetParams() {
        const queryParams = { bookingDate: this.bookingDate, players: this.players, holes: this.holes };
        this.router.navigate([ 'teetimes', this.facilityId ], { queryParams });
    }

    private _isBetween(teetime: ITeetime, from: number, to: number) {
        const h0 = new Date(teetime.time).getHours();
        return h0 >= from && h0 < to;
    }
}
