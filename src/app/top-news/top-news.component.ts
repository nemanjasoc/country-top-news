import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';
import { LanguageService } from '../service/language.service';

import { Articles } from './top-news';

@Component({
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.scss']
})

export class TopNewsComponent implements OnInit, OnDestroy {
  articles: Articles[];
  errorMessage: string;
  lastCountryData: string;

  languageChangedSubscription: Subscription;
  searchedTextChangedSubscription: Subscription;


  constructor(public dataService: DataService,
    public LanguageService: LanguageService) { }
    

  ngOnInit(): void {
    this.subscribeToLanguageChange();
    this.refreshTopNewsData(this.LanguageService.currentSelectedLanguage.key);
    this.subscribeToSearchedTextChanged();
    this.refreshSearchedTextData('bitcoin');
  }

  subscribeToLanguageChange() {
    this.languageChangedSubscription = this.LanguageService.languageChangedObservable()
      .subscribe(result => {
        this.refreshTopNewsData(result);
      });
  }

  subscribeToSearchedTextChanged() {
    this.searchedTextChangedSubscription = this.dataService.searchedTextChangedObservable()
      .subscribe(result => {
        if (result && result.trim().length) {
          this.refreshSearchedTextData(result);
        } else {
          this.refreshTopNewsData(this.lastCountryData);
        }
      });
  }

  refreshTopNewsData(country: string) {
    this.lastCountryData = country;
    this.dataService.getTopNews(country).subscribe(data => {
      this.articles = data;
    },
      err => this.errorMessage = err);
  }

  refreshSearchedTextData(searchedText: string) {
    this.dataService.getSearchedNews(searchedText).subscribe(data => {
      this.articles = data;
    },
      err => this.errorMessage = err);
  }

  ngOnDestroy() {
    this.languageChangedSubscription.unsubscribe();
    this.searchedTextChangedSubscription.unsubscribe();
  }

}
