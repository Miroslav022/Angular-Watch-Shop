import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.css',
})
export class SubmitButtonComponent {
  @Input() isDisabled: boolean = true;
  @Input() processing: boolean = true;
  @Input() onClickButton: any;
  @Input() form: any;
}
