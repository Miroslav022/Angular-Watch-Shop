import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() buttonText: string = '';
  @Input() className: string = 'room-btn';
  @Input() innerClass: string = 'view-btn1';
  @Input() link: string = '/shop';
  @Input() isEnabled: boolean = false;
  @Input() onClick: Function;
}
