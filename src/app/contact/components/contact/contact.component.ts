import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactApiService } from '../../business-logic/contact-api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'], // note the plural "styleUrls"
})
export class ContactComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
  });

  visible = false;
  processing = false;

  constructor(
    public http: HttpClient,
    private contactService: ContactApiService
  ) {}

  ngOnInit(): void {
    this.runValidation();
  }

  runValidation(): void {
    Object.keys(this.form.controls).forEach((ctrlName) => {
      this.form.get(ctrlName)?.markAsTouched();
    });
  }

  onSubmit() {
    this.processing = true;
    const dataToSend = {
      Name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      message: this.form.get('message')?.value,
      subject: this.form.get('subject')?.value,
    };

    setTimeout(() => {
      this.form.reset();
      this.processing = false;
      this.contactService.insert(dataToSend).subscribe();
      this.toggleVisibility();
    }, 2000);
  }

  toggleVisibility(): void {
    this.visible = !this.visible;
  }
}
