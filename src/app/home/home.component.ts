import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, } from 'rxjs';
import { DataService } from '../service/data.service';
import { Articles } from './home';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  articles: Articles[];
  errorMessage: string;
  
  countryChangedSubscription: Subscription;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.subscribeToCountryChanged();
    this.refreshData('gb');
  }

  subscribeToCountryChanged() {
    this.countryChangedSubscription = this.dataService.countryChangedObservable()
      .subscribe(result => {
        this.refreshData(result);
      });
  }

  refreshData(country: string) {
    this.dataService.getCountryTopNews(country).subscribe(data => {
      this.articles = data.slice(0, 5);
    }, err => this.errorMessage = err)
  }

  ngOnDestroy() { 
    this.countryChangedSubscription.unsubscribe();
  }
}
