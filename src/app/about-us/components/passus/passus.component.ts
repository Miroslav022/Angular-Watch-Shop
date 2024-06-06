import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-passus',
  templateUrl: './passus.component.html',
  styleUrl: './passus.component.css',
})
export class PassusComponent {
  @Input() Heading: string = '';
  @Input() content: string = '';
}
