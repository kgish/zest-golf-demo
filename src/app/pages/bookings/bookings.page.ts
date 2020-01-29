import { Component, OnInit } from '@angular/core';

import { ApiService, IBooking } from '../../services/api';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: [ './bookings.page.scss' ],
})
export class BookingsPage implements OnInit {

    bookings: IBooking[] = [];

    constructor(private api: ApiService) {
    }

    ngOnInit() {
        this.api.bookings().subscribe(bookings => this.bookings = bookings);
    }

    bookingDetail(booking: IBooking) {
        console.log(booking);
    }
    get title() {
        return 'Bookings';
    }
}
