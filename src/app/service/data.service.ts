import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Articles, News } from '../top-news/top-news';

@Injectable({
  providedIn: "root"
})

export class DataService {
  allArticles: Articles[];

  private searchedTextChangedSubject = new Subject<string>();

  constructor(public http: HttpClient) { }


  searchedTextChangedObservable(): Observable<string> {
    return this.searchedTextChangedSubject.asObservable();
  }

  searchedTextChangedNotify(searchedText: string) {
    return this.searchedTextChangedSubject.next(searchedText);
  }

  setSearchedText(searchedText: string) {
    this.searchedTextChangedNotify(searchedText);
  }


  getSearchedNews(searchedText: string): Observable<Articles[]> {
    return this.http.get<News>(`https://newsapi.org/v2/everything?q=${searchedText}&apiKey=cf9c0a24aed7448aaafaef9313c9f39f`)
      .pipe(
        map(data => {
          return data.articles.map((item, index) => {
            item.customId = index + 1;
            return item;
          });
        }),
        tap(data => this.allArticles = data),
        catchError(this.handleError)
      );
  }

  getTopNews(countryAbbreviation: string): Observable<Articles[]> {
    return this.http.get<News>(`https://newsapi.org/v2/top-headlines?country=${countryAbbreviation}&apiKey=cf9c0a24aed7448aaafaef9313c9f39f`)
      .pipe(
        map(data => {
          return data.articles.map((item, index) => {
            item.customId = index + 1;
            return item;
          });
        }),
        tap(data => this.allArticles = data),
        catchError(this.handleError)
      );
  }

  getCategoryTopNews(category: string, country: string): Observable<Articles[]> {
    return this.http.get<News>(`https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=cf9c0a24aed7448aaafaef9313c9f39f`)
      .pipe(
        map(data => {
          return data.articles.map((item, index) => {
            item.customId = index + 1;
            return item;
          });
        }),
        tap(data => this.allArticles = data),
        catchError(this.handleError)
      );
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
