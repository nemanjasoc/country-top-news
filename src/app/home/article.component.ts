import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { Articles } from './home';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articles: Articles[];
  article: object;

  constructor(private route: ActivatedRoute, public dataService: DataService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log("id: ", id)
    console.log("articles article component: ", this.dataService.articles)

    // let clickedArticle: object;

    // for (let i = 0; i < this.dataService.articles.length; i++) {
    //   let currentArtictle = this.dataService.articles[i];

    //   if (currentArtictle.id === id) {
    //     clickedArticle = currentArtictle;
    //   }

    //   this.article = clickedArticle;
    // }
    
  }

}
