import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  allLanguages = [
    {
      key: 'gb',
      country: 'Great Britain'
    },
    {
      key: 'us',
      country: 'United States'
    }
  ];


  currentSelectedLanguage = this.allLanguages[0];

  private languageChangedSubject = new Subject<string>();


  constructor() { }


  languageChangedObservable(): Observable<string> {
    return this.languageChangedSubject.asObservable();
  }

  languageChangedNotify(country: string) {
    return this.languageChangedSubject.next(country);
  }

  changeLanguage(languageKey: string) {
    this.currentSelectedLanguage = this.allLanguages.find(item => item.key === languageKey);
    this.languageChangedNotify(languageKey);
  }


}
