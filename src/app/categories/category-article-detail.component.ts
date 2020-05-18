import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { Articles } from '../top-news/top-news';

@Component({
  selector: 'app-category-article-detail',
  templateUrl: './category-article-detail.component.html',
  styleUrls: ['./category-article-detail.component.scss']
})

export class CategoryArticleDetailComponent implements OnInit {
  article: Articles;
  

  constructor(private route: ActivatedRoute, public dataService: DataService) { }


  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.dataService.allArticles) {
      this.article = this.dataService.allArticles.find(item => item.customId === id);
    } else {
      this.dataService.getCategoryTopNews('entertainment', 'gb').subscribe(data => {
        this.article = data.find(item => item.customId === id);
      });
    }

  }
  
}
