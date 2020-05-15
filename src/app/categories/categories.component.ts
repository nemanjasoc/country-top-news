import { Component, OnInit } from '@angular/core';
import { Category } from './categories';
import { DataService } from '../service/data.service';
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

  loading = false;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.refreshData('category');
  }

  onClickCategoryExpand(category: string): void {
    this.refreshData(category);
    this.expandedCategory = category;
  }

  refreshData(category: string) {
    this.loading = true;
    this.dataService.getCategoryTopNews(category).subscribe(data => {
      this.articles = data.slice(0, 5);
      this.loading = false;
    }, err =>  {
      this.errorMessage = err;
      this.loading = false;
    })
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
