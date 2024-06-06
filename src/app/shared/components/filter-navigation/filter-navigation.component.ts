import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-navigation',
  templateUrl: './filter-navigation.component.html',
  styleUrl: './filter-navigation.component.css',
})
export class FilterNavigationComponent {
  perPage: any[] = [
    {
      id: 1,
      page: 'Show 3',
    },
    {
      id: 2,
      page: 'Show 6',
    },
    {
      id: 3,
      page: 'Show 9',
    },
  ];
}
