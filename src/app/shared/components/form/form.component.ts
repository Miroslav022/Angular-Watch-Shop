import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Input() form: any;
  @Input() onSubmit: any;
}
// message: ['', [Validators.required, Validators.minLength(10)]],
// name: ['', [Validators.required, Validators.minLength(3)]],
// email: ['', [Validators.required, Validators.email]],
// subject: ['', [Validators.required]],
