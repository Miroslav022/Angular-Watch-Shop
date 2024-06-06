import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-shop-method',
  templateUrl: './single-shop-method.component.html',
  styleUrl: './single-shop-method.component.css',
})
export class SingleShopMethodComponent {
  @Input() method: string = '';
  @Input() textMethod: string = '';
}
