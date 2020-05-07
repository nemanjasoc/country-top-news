import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Articles } from '../home/home'

@Injectable({
    providedIn: "root"
})

export class DataService {
    countryName: string;

    constructor(public http: HttpClient) { }

    getCountryTopNews(countryAbbreviation: string): Observable<Articles[]> {
        return this.http.get<Articles[]>(`https://newsapi.org/v2/top-headlines?country=${countryAbbreviation}&apiKey=cf9c0a24aed7448aaafaef9313c9f39f`).pipe(
            tap(data => JSON.stringify(data)),
            catchError(this.handleError)
        )
    }

    public handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error ocured: ${err.error.message}`
        } else {
            errorMessage = `Server return code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

}