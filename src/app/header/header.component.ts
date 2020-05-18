import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataService } from '../service/data.service';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  showDropdownMenu = false;
  disableLanguageSelection = false;

  constructor(private router: Router,
    public dataService: DataService,
    public languageService: LanguageService) {

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url === '/categories' || event.url === '/top-news') {
        this.disableLanguageSelection = false;
      } else {
        this.disableLanguageSelection = true;
      }
    });
  }

  onChangeLanguage(languageKey: string): void {
    this.languageService.changeLanguage(languageKey);
  }

  onEnterSearchedText(event): void {
    this.dataService.setSearchedText(event.target.value);
  }

}
