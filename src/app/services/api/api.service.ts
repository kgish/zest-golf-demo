import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Holes, IFacility, ITeetime, Players } from './api.models';

interface IResult<T> {
    success: boolean;
    data: T;
}

interface IResults<T> {
    success: boolean;
    data: T[];
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    countries(connected: boolean = false): Observable<string[]> {
        const url = environment.apiUrl + '/countries' + (connected ? '?connected=true' : '');
        return this.http.get(url).pipe(
            map((x: IResults<string>) => x.data.sort())
        );
    }

    facilities(country: string, connected: boolean = false): Observable<IFacility[]> {
        const url = environment.apiUrl + '/facilities?country=' + encodeURIComponent(country) + (connected ? '&connected=true' : '');
        return this.http.get(url).pipe(
            map((x: IResults<IFacility>) => x.data.sort((a, b) => a.name === b.name ? 0 : (a.name > b.name ? 0 : -1)))
        );
    }

    facility(id: string, details: boolean = false): Observable<IFacility> {
        const url = environment.apiUrl + '/facilities/' + (details ? 'details/' : '') + id;
        return this.http.get(url).pipe(
            map((x: IResult<IFacility>) => x.data)
        );
    }

    teetimes(facilityId: number, bookingDate: Date = new Date(), players: Players = '2', holes: Holes = 18): Observable<ITeetime[]> {
        const dd =
            bookingDate.getDate().toString().padStart(2, '0') + '-' +
            (bookingDate.getMonth() + 1).toString().padStart(2, '0') + '-' +
            bookingDate.getFullYear();
        const url = environment.apiUrl + '/teetimes/' + facilityId + `/?bookingDate=${dd}&players=${players}&holes=${holes}`;
        return this.http.get(url).pipe(
            map((x: IResults<ITeetime>) => x.data.sort((a, b) => a.time === b.time ? 0 : (a.time > b.time ? 0 : -1)))
        );
    }
}
