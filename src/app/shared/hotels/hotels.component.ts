import { Component, Input, OnInit } from '@angular/core';

import { HotelService, IHotel } from '../../services/hotel';

@Component({
    selector: 'app-hotels',
    templateUrl: './hotels.component.html',
    styleUrls: [ './hotels.component.scss' ],
})
export class HotelsComponent implements OnInit {

    @Input() facilityId: number;

    hotels: IHotel[] = [];

    constructor(private hotel: HotelService) {
    }

    ngOnInit() {
        this.hotel.getNearby(this.facilityId).subscribe(
            hotels => this.hotels = hotels,
            error => console.error(error)
        );
    }

}
