import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Holes, IBooking, IFacility, ITeetime, Players } from './api.models';
import { UiService } from '../ui';

interface IResult<T> {
    success: boolean;
    data: T;
}

interface IResults<T> {
    success: boolean;
    data: T[];
}

const TIMEOUT_MSECS = 500;

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient, private ui: UiService) {
    }

    countries(connected: boolean = false): Observable<string[]> {
        const url = environment.apiUrl + '/countries' + (connected ? '?connected=true' : '');
        this.ui.showLoading();
        return this.http.get(url).pipe(
            delay(TIMEOUT_MSECS),
            map((x: IResults<string>) => x.data.sort()),
            finalize(() => this.ui.hideLoading())
        );
    }

    facilities(country: string, connected: boolean = false): Observable<IFacility[]> {
        const url = environment.apiUrl + '/facilities?country=' + encodeURIComponent(country) + (connected ? '&connected=true' : '');
        this.ui.showLoading();
        return this.http.get(url).pipe(
            delay(TIMEOUT_MSECS),
            map((x: IResults<IFacility>) => x.data.sort((a, b) => a.name === b.name ? 0 : (a.name > b.name ? 0 : -1))),
            finalize(() => this.ui.hideLoading())
        );
    }

    facility(id: string, details: boolean = false): Observable<IFacility> {
        const url = environment.apiUrl + '/facilities/' + (details ? 'details/' : '') + id;
        this.ui.showLoading();
        return this.http.get(url).pipe(
            delay(TIMEOUT_MSECS),
            map((x: IResult<IFacility>) => x.data),
            finalize(() => this.ui.hideLoading())
        );
    }

    teetimes(facilityId: number, bookingDate: Date = new Date(), players: Players = '2', holes: Holes = 18): Observable<ITeetime[]> {
        const dd =
            bookingDate.getDate().toString().padStart(2, '0') + '-' +
            (bookingDate.getMonth() + 1).toString().padStart(2, '0') + '-' +
            bookingDate.getFullYear();
        const url = environment.apiUrl + '/teetimes/' + facilityId + `/?bookingDate=${dd}&players=${players}&holes=${holes}`;
        this.ui.showLoading();
        return this.http.get(url).pipe(
            delay(TIMEOUT_MSECS),
            map((x: IResults<ITeetime>) => x.data.sort((a, b) => a.time === b.time ? 0 : (a.time > b.time ? 0 : -1))),
            finalize(() => this.ui.hideLoading())
        );
    }

    bookTeetime(facilityId: number, teetime: Date, players: Players, contactPhone: string,
                contactEmail: string, contactFirstName: string, contactLastName: string, holes: Holes, teeId: number): Observable<string> {
        const url = environment.apiUrl + '/bookings';
        const body = {
            facilityId,
            teetime: this._formatTeetimeDate(teetime),
            round: `${holes} holes`,
            players: +players,
            contactPhone,
            contactEmail,
            contactFirstName,
            contactLastName,
            holes: +holes,
            teeId
        };
        this.ui.showLoading();
        return this.http.post(url, body).pipe(
            delay(TIMEOUT_MSECS),
            map((x: IResult<string>) => x.data),
            finalize(() => this.ui.hideLoading())
        );
    }

    bookings(fromDate: Date = null, toDate: Date = null) {
        let url = environment.apiUrl + '/bookings';
        if (fromDate) {
            url += `?fromDate=${this._formatBookingDate(fromDate)}`;
            if (toDate) {
                url += `&toDate=${this._formatBookingDate(toDate)})`;
            }
        }
        this.ui.showLoading();
        return this.http.get(url).pipe(
            delay(TIMEOUT_MSECS),
            map((x: IResults<IBooking>) => x.data.sort((a, b) => a.teetime === b.teetime ? 0 : (a.teetime > b.teetime ? 0 : -1))),
            finalize(() => this.ui.hideLoading())
        );
    }

    // Private

    private _formatTeetimeDate(teetimeDate: Date): string {
        // teetimeDate => "YYYY-MM-DD HH:MM:00"
        const year = teetimeDate.getFullYear();
        const month = (teetimeDate.getMonth() + 1).toString().padStart(2, '0');
        const date = teetimeDate.getDate().toString().padStart(2, '0');
        const hours = teetimeDate.getHours().toString().padStart(2, '0');
        const minutes = teetimeDate.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${date} ${hours}:${minutes}:00`;
    }

    private _formatBookingDate(bookingDate: Date): string {
        // bookingDate => "DD-MM-YYYY"
        const year = bookingDate.getFullYear();
        const month = (bookingDate.getMonth() + 1).toString().padStart(2, '0');
        const date = bookingDate.getDate().toString().padStart(2, '0');

        return `${date}-${month}-${year}`;
    }
}
