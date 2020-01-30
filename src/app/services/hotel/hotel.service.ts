import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IHotel } from './hotel.model';
import { HOTELS } from './hotel.data';

const MAX = 4;

@Injectable({
    providedIn: 'root'
})
export class HotelService {

    constructor() {
    }

    getNearby(facilityId: number): Observable<IHotel[]> {
        const hotels: IHotel[] = [];
        const total = Math.floor(Math.random() * MAX) + 1;

        while (hotels.length < total) {
            const n = Math.floor(Math.random() * HOTELS.length);
            const hotel = HOTELS[n];
            if (!hotels.length || !hotels.find(h => h.id === hotel.id)) {
                hotel.distance = Math.floor(Math.random() * 50) + 1;
                hotels.push(hotel);
            }
        }

        return of(hotels.sort((a, b) => a.distance === b.distance ? 0 : a.distance < b.distance ? -1 : 1));
    }
}
