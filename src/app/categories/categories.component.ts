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

  articles: Articles[];
  errorMessage: string;
  showArticles: boolean = false;

  categoryChangedSubscription: Subscription;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.subscribeToCategoryChanged();
    this.refreshData('category');
  }

  onClickCategoryExpand(category: string): void {
    let categoryLowercase = category.toLowerCase();
    this.dataService.setCategory(categoryLowercase);
    this.showArticles = true;
  }

  onClickCategoryCollaps(): void {
    this.showArticles = false;
    this.articles = null;
  }

  subscribeToCategoryChanged() {
    this.categoryChangedSubscription = this.dataService.categoryChangedObservable()
      .subscribe(result => {
        this.refreshData(result);
      });
  }

  refreshData(country: string) {
    this.dataService.getCategoryTopNews(country).subscribe(data => {
      this.articles = data.slice(0, 5);
    }, err => this.errorMessage = err)
  }

  ngOnDestroy() { 
    this.categoryChangedSubscription.unsubscribe();
  }

}
