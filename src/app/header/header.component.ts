import { Component } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showDropdownMenu: boolean = false;

  constructor(public dataService: DataService) { }

  onClickCountry(country: string): void {
    this.dataService.setCountry(country);
  }

  getSearchedText(event): void {
    this.dataService.setSearchedText(event.target.value);
  }

}
