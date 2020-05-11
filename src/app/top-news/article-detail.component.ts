import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { Articles } from './top-news';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: Articles;

  constructor(private route: ActivatedRoute, public dataService: DataService) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.dataService.allArticles) {
      this.article = this.dataService.allArticles.find(item => item.customId === id);
    } else {
      this.dataService.getCountryTopNews('gb').subscribe(data => {
        this.article = data.find(item => item.customId === id);
      });
    }

  }

}
