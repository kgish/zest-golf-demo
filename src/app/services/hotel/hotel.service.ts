import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IHotel } from './hotel.model';
import { HOTELS } from './hotel.data';

const MAX = 4;

@Injectable({
    providedIn: 'root'
})
export class HotelService {

    private num: number;

    constructor() {
        this.num = HOTELS.length;
    }

    getNearby(facilityId: string): Observable<IHotel[]> {
        const hotels: IHotel[] = [];
        const total = Math.floor(Math.random() * MAX) + 1;

        while (hotels.length < total) {
            const n = Math.floor(Math.random() * (this.num + 1));
            const h = HOTELS[n];
            if (!hotels.find(x => x.id === h.id)) {
                h.distance = Math.floor(Math.random() * 50);
                hotels.push(h);
            }
        }

        return of(hotels);
    }
}
