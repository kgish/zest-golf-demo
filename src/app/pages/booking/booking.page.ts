import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
    ApiService,
    AuthService,
    Holes,
    IFacility,
    Players,
    UiService
} from '../../services';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.page.html',
    styleUrls: [ './booking.page.scss' ],
})
export class BookingPage implements OnInit {

    facility: IFacility;
    teetime: Date;
    holes: Holes;
    players: Players;
    teeId: number;

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private ui: UiService,
        private auth: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
        const facilityId = this.route.snapshot.paramMap.get('id');

        this.teetime = new Date(this.route.snapshot.queryParamMap.get('teetime'));
        this.holes = (this.route.snapshot.queryParamMap.get('holes') as unknown) as Holes;
        this.players = (this.route.snapshot.queryParamMap.get('players') as unknown) as Players;
        this.teeId = +this.route.snapshot.queryParamMap.get('teeId');

        this.api.facility(facilityId).subscribe(facility => {
            this.facility = facility;
            console.log({
                facilityId: this.facility.id,
                teetime: this.teetime,
                holes: this.holes,
                players: this.players,
                teeId: this.teeId
            });
        });
    }

    onSubmit() {
        const currentUser = this.auth.getCurrentUser();
        this.api.bookTeetime(this.facility.id, new Date(this.teetime), this.players, currentUser.phone,
            currentUser.email, currentUser.firstName, currentUser.lastName, this.holes, this.teeId).subscribe(
            bookingId => {
                this.ui.showToast(`Booking successful #${bookingId}`);
            },
            error => {
                console.error(error);
                this.ui.showToast(`Booking failed (${error.status} ${error.statusText})`);
            }
        );
    }

    onCancel() {
        const queryParams = { bookingDate: this.teetime, players: this.players, holes: this.holes };
        this.router.navigate([ '/teetimes', this.facility.id ], { queryParams }).then(() => {});
    }

    get title() {
        return 'Booking';
    }
}
