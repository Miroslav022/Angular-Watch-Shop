import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDataPagination } from '../../../Interfaces/IApiData';
import { SpecificationsService } from '../../../services/specifications.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../../shop/interfaces/iproduct';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product-specifications',
  templateUrl: './edit-product-specifications.component.html',
  styleUrl: './edit-product-specifications.component.css',
})
export class EditProductSpecificationsComponent {
  specifications: IDataPagination;
  isSuccess: boolean = false;
  isFailed: boolean = false;
  @Input() product: IProduct | null;
  @Output() addSpecificationEmmit: EventEmitter<boolean> = new EventEmitter(
    false
  );

  form: any = new FormGroup({
    specification: new FormControl('0', [
      Validators.required,
      Validators.pattern(/^[1-9]*$/),
    ]),
    value: new FormControl('', Validators.required),
  });

  constructor(
    private specificationService: SpecificationsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.specificationService.getAllSpecifications().subscribe({
      next: (response) => {
        console.log(response);
        this.specifications = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  addSpecification() {
    const id = Number(this.route.snapshot.paramMap.get('id') || 0);
    const data = {
      productId: id,
      specificationId: this.form.get('specification').value,
      value: this.form.get('value').value,
    };
    this.specificationService.addProductSpecification(data).subscribe({
      next: (response) => {
        console.log(response);
        this.isSuccess = true;
        this.addSpecificationEmmit.emit(true);
      },
      error: (error) => {
        console.log(error);
        this.isFailed = true;
      },
    });
  }
}
