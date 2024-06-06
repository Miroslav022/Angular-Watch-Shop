import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-singlearrivals',
  templateUrl: './singlearrivals.component.html',
  styleUrl: './singlearrivals.component.css',
})
export class SinglearrivalsComponent {
  @Input() product: any;
}
