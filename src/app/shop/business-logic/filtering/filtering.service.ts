import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilteringService {
  constructor() {}
  private selectedCategoriesSubject = new BehaviorSubject<number[]>([]);
  private selectedBrandsSubject = new BehaviorSubject<number[]>([]);
  private selectedSortSubject = new BehaviorSubject('');
  private SearchSubject = new BehaviorSubject('');

  selectedBrands$ = this.selectedBrandsSubject.asObservable();
  selectedCategories$ = this.selectedCategoriesSubject.asObservable();
  selectedSort$ = this.selectedSortSubject.asObservable();
  Search$ = this.SearchSubject.asObservable();

  // getSelectedCategories(): Observable<number[]> {
  //   return this.selectedCategoriesSubject.asObservable();
  // }
  setSelectedCategories(categories: number[]): void {
    this.selectedCategoriesSubject.next(categories);
  }

  setSelectedSort(sort: string): void {
    this.selectedSortSubject.next(sort);
  }

  setSearch(search: string): void {
    this.SearchSubject.next(search);
  }

  // getSelectedBrands(): Observable<number[]> {
  //   return this.selectedBrandsSubject;
  // }
  setSelectedBrands(brands: number[]): void {
    this.selectedBrandsSubject.next(brands);
  }
}
