import { Component, OnInit } from '@angular/core';
import { Category } from './categories';
import { DataService } from '../service/data.service';
import { Subscription } from 'rxjs';
import { Articles } from '../top-news/top-news';

@Component({
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoryNames: Category[] = [
    { category_name: 'Entertainment' },
    { category_name: 'General' },
    { category_name: 'Health' },
    { category_name: 'Science' },
    { category_name: 'Sport' },
    { category_name: 'Technology' }
  ]

  articles: Articles[] = [];
  errorMessage: string;
  expandedCategory: string;
  lastCountryData: string;
  lastCategoryData: string;
  loading = false;


  countryChangedSubscription: Subscription;


  constructor(public dataService: DataService) { }


  ngOnInit(): void {
    this.refreshData('category');
    this.subscribeToCountryChanged();
    this.refreshCountryData('gb');
  }

  onClickCategoryExpand(category: string): void {
    this.dataService.setCategory(category);
    this.refreshData(category);
    this.refreshCountryData('gb');
    this.expandedCategory = category;
  }

  subscribeToCountryChanged() {
    this.countryChangedSubscription = this.dataService.countryChangedObservable()
      .subscribe(result => {
        this.refreshCountryData(result);
      });
  }

  refreshCountryData(country: string) {
    this.lastCountryData = country;
    this.dataService.getCountryTopNews(country).subscribe(data => {
      this.articles = data.slice(0, 5);
    },
      err => this.errorMessage = err);
  }

  refreshData(category: string) {
    let country = this.lastCountryData;
    this.loading = true;
    this.dataService.getCategoryTopNews(category, country).subscribe(data => {
      this.articles = data.slice(0, 5);
      this.loading = false;
    }, err =>  {
      this.errorMessage = err;
      this.loading = false;
    })
  }

  ngOnDestroy() {
    this.countryChangedSubscription.unsubscribe();
  }

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
    "infinite": false
  };

}
