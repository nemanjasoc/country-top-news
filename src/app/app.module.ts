import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TopNewsComponent } from './top-news/top-news.component';
import { ArticleDetailComponent } from './top-news/article-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryArticleDetailComponent } from './categories/category-article-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopNewsComponent,
    ArticleDetailComponent,
    CategoriesComponent,
    CategoryArticleDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      { path: 'top-news', component: TopNewsComponent },
      { path: 'top-news/:id', component: ArticleDetailComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/:id', component: CategoryArticleDetailComponent },
      { path: '', redirectTo: 'top-news', pathMatch: 'full' },
      { path: '**', redirectTo: 'top-news', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
