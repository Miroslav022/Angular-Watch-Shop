import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css',
})
export class WatchComponent {
  @Input() Name: string = '';
  @Input() Price: number = 0;
  @Input() Image: string = '';
}
