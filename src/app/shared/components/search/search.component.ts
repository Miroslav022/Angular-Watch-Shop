import { Component, OnInit } from '@angular/core';
import { FilteringService } from '../../../shop/business-logic/filtering/filtering.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  constructor(private filteringService: FilteringService) {}

  search: string = '';

  changeSearchValue() {
    //Obrisati ako nije potrebno
    this.filteringService.setSearch(this.search);
  }
}
