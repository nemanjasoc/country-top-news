import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Articles } from './home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles: Articles[];
  errorMessage: string;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCountryTopNews('gb').subscribe({
      next: (news: any) => {
        this.articles = news.articles.slice(0, 5);
        console.log("news: ", news.articles.slice(0, 5))
      },
      error: err => this.errorMessage = err
    })
  }

}
