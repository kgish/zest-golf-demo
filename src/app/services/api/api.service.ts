import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { IFacility } from './api.models';

interface IResult<T> {
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
            map((x: IResult<string>) => x.data)
        );
    }

    facilities(country: string, connected: boolean = false): Observable<IFacility[]> {
        const url = environment.apiUrl + '/facilities?country=' + encodeURIComponent(country) + (connected ? '&connected=true' : '');
        return this.http.get(url).pipe(
            map((x: IResult<IFacility>) => x.data)
        );
    }
}
