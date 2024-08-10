import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecensionsService } from '../../business-logic/Api/recensions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recension-form',
  templateUrl: './recension-form.component.html',
  styleUrl: './recension-form.component.css',
})
export class RecensionFormComponent implements OnInit {
  productId: number = 0;
  @Output() recensionAdded: EventEmitter<boolean> = new EventEmitter(false);
  form: any = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  // runValidation(): void {
  //   Object.keys(this.form.controls).forEach((ctrlName) => {
  //     this.form.get(ctrlName).markAsTouched();
  //   });
  // }

  constructor(
    private _recensionService: RecensionsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // this.runValidation();
    this.productId = Number(this.route.snapshot.paramMap.get('id') || 0);
  }

  onSubmit(): void {
    if (this.productId !== 0) {
      let data = {
        productId: this.productId,
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
      };
      this._recensionService.writeRecension(data);
      this.recensionAdded.emit(true);
    } else console.error('Greska');
  }
}
