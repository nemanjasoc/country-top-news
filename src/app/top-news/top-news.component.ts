import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';
import { Articles } from './top-news';

@Component({
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.scss']
})
export class TopNewsComponent implements OnInit, OnDestroy {
  articles: Articles[];
  errorMessage: string;

  countryChangedSubscription: Subscription;

  searchedTextChangedSubscription: Subscription;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.subscribeToCountryChanged();
    this.refreshCountryData('gb');
    this.subscribeToSearchedTextChanged();
    this.refreshSearchedTextData("bitcoin");
  }

  subscribeToCountryChanged() {
    this.countryChangedSubscription = this.dataService.countryChangedObservable()
      .subscribe(result => {
        this.refreshCountryData(result);
      });
  }

  subscribeToSearchedTextChanged() {
    this.searchedTextChangedSubscription = this.dataService.searchedTextChangedObservable()
      .subscribe(result => {
        this.refreshSearchedTextData(result);
      });
  }

  refreshCountryData(country: string) {
    this.dataService.getCountryTopNews(country).subscribe(data => {
      this.articles = data.slice(0, 5);
    }, 
    err => this.errorMessage = err)
  }

  refreshSearchedTextData(searchedText: string) {
    this.dataService.getSearchedNews(searchedText).subscribe(data => {
      this.articles = data;
    }, 
    err => this.errorMessage = err)
  }

  ngOnDestroy() { 
    this.countryChangedSubscription.unsubscribe();
    this.searchedTextChangedSubscription.unsubscribe();
  }
}
