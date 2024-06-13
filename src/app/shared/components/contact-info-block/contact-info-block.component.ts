import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-info-block',
  templateUrl: './contact-info-block.component.html',
  styleUrl: './contact-info-block.component.css',
})
export class ContactInfoBlockComponent {
  @Input() heading: string = '';
  @Input() subHeading: string = '';
}
