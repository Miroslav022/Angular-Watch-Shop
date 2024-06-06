import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-watch-of-choice',
  templateUrl: './single-watch-of-choice.component.html',
  styleUrl: './single-watch-of-choice.component.css',
})
export class SingleWatchOfChoiceComponent {
  @Input() text: string = '';
  @Input() heading: string = '';
  @Input() image: string = '';
  @Input() reverse: boolean = false;
}
