import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService, Holes, IFacility, Players } from '../../services/api';

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
    teeId: string;
    round: number;

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private router: Router
    ) {
    }

    ngOnInit() {
        const facilityId = this.route.snapshot.paramMap.get('id');

        this.teetime = new Date(this.route.snapshot.queryParamMap.get('teetime'));
        this.holes = (this.route.snapshot.queryParamMap.get('holes') as unknown) as Holes;
        this.players = (this.route.snapshot.queryParamMap.get('players') as unknown) as Players;
        this.teeId = this.route.snapshot.queryParamMap.get('teeId');
        this.round = 1;

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

    changeRound($event: CustomEvent) {
        this.round = $event.detail.value;
    }

    onSubmit() {
        // '{"facilityId":"1",
        // "teetime":"2018-08-20 07:20:00",
        //     "round":"1",
        //     "players":3,
        //     "contactPhone":"07712345678",
        //     "contactEmail":"james.smith@gmail.com",
        //     "contactName":"James Smith",
        //     "holes":9,
        //     "teeId":4250490}'
    }

    onCancel() {
        const queryParams = { bookingDate: this.teetime, players: this.players, holes: this.holes };
        this.router.navigate([ '/teetimes', this.facility.id ], { queryParams });
    }

    get title() {
        return 'Booking';
    }
}
