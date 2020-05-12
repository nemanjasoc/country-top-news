import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Articles, News } from '../top-news/top-news';

@Injectable({
  providedIn: "root"
})

export class DataService {
  countryName: string = 'Great Britain:';
  activeGB: boolean = true;
  activeUS: boolean = false;
  allArticles: Articles[];

  private countryChangedSubject = new Subject<string>();

  private categoryChangedSubject = new Subject<string>();

  constructor(public http: HttpClient) { }

  countryChangedObservable(): Observable<string> {
    return this.countryChangedSubject.asObservable();
  }

  categoryChangedObservable(): Observable<string> {
    return this.categoryChangedSubject.asObservable();
  }

  countryChangedNotify(country: string) {
    return this.countryChangedSubject.next(country);
  }

  categoryChangedNotify(category: string) {
    return this.categoryChangedSubject.next(category);
  }

  setCountry(country: string) {
    this.countryChangedNotify(country);
    if (country === 'gb') {
      this.countryName = 'Great Britain:';
      this.activeUS = false;
      this.activeGB = true;
    } else {
      this.countryName = 'United States:';
      this.activeGB = false;
      this.activeUS = true;
    }
  }

  setCategory(category: string) {
    this.categoryChangedNotify(category);
  }

  getCountryTopNews(countryAbbreviation: string): Observable<Articles[]> {
    return this.http.get<News>(`https://newsapi.org/v2/top-headlines?country=${countryAbbreviation}&apiKey=cf9c0a24aed7448aaafaef9313c9f39f`)
      .pipe(
        map(data => {
          return data.articles.map((item, index) => {
            item.customId = index + 1;
            return item;
          })
        }),
        tap(data => this.allArticles = data),
        catchError(this.handleError)
      )
  }

  getCategoryTopNews(category: string): Observable<Articles[]> {
    return this.http.get<News>(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=cf9c0a24aed7448aaafaef9313c9f39f`)
    .pipe(
      map(data => {
        return data.articles.map((item, index) => {
          item.customId = index + 1;
          return item;
        })
      }),
      tap(data => this.allArticles = data),
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