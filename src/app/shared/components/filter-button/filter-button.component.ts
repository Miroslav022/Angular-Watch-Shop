import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilteringService } from '../../../shop/business-logic/filtering/filtering.service';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrl: './filter-button.component.css',
})
export class FilterButtonComponent {
  @Input() filterOption: string = '';
  @Input() activeClass: string = '';
  sortOption: string = '';
  @Output() choosenOption = new EventEmitter();

  constructor(private filteringService: FilteringService) {}

  onClick(event: Event): void {
    this.choosenOption.emit(this.filterOption);
    event.preventDefault();
    const target = event.target as HTMLElement;
    target.classList.toggle('active');
    this.filteringService.setSelectedSort(target.innerText.toLowerCase());
  }
}
