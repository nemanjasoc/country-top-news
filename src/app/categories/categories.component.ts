import { Component, OnInit } from '@angular/core';
import { Category } from './categories';
import { DataService } from '../service/data.service';
import { LanguageService } from '../service/language.service';
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
  ];

  articles: Articles[] = [];
  errorMessage: string;
  expandedCategory: string;
  lastCountryData: string;
  lastCategoryData: string;
  loading = false;


  languageChangedSubscription: Subscription;


  constructor(public dataService: DataService,
    public languageService: LanguageService) { }


  ngOnInit(): void {
    this.subscribeToLanguageChange();
  }

  onClickCategoryExpand(category: string): void {
    this.refreshData(category);
    this.expandedCategory = category;
  }

  subscribeToLanguageChange() {
    this.languageChangedSubscription = this.languageService.languageChangedObservable()
      .subscribe(result => {
        this.refreshData(this.expandedCategory);
      });
  }

  refreshData(category: string) {
    this.loading = true;
    this.dataService.getCategoryTopNews(category, this.languageService.currentSelectedLanguage.key).subscribe(data => {
      this.articles = data.slice(0, 5);
      this.loading = false;
    }, err =>  {
      this.errorMessage = err;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.languageChangedSubscription.unsubscribe();
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
