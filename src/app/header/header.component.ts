import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showDropdownMenu: boolean = false;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  countryUS(): void {
    this.dataService.countryAbbreviation = "us";
    this.dataService.countryName = "United States";
  }

  countryGB(): void {
    this.dataService.countryAbbreviation = "gb";
    this.dataService.countryName = "Great Britain";
  }

}
