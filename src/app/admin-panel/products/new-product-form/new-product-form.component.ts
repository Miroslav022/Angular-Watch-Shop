import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BrandsApiService } from '../../../shop/business-logic/api/brands-api.service';
import { CategoriesApiService } from '../../../shop/business-logic/api/categories-api.service';
import { IBrandPagination } from '../../../shop/interfaces/ibrand';
import { ICategoryPagination } from '../../../shop/interfaces/icategory';
import { SpecificationsService } from '../../../services/specifications.service';
import { IDataPagination } from '../../../Interfaces/IApiData';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { ProductsApiService } from '../../../shop/business-logic/api/products-api.service';

@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrl: './new-product-form.component.css',
})
export class NewProductFormComponent implements OnInit {
  @Output() productAdded = new EventEmitter<boolean>();
  isFailed: boolean = false;
  isSuccess: boolean = false;
  brands: IBrandPagination;
  categories: ICategoryPagination;
  specifications: IDataPagination;
  images: File[] = [];
  productSpecifications: {
    specificationId: number;
    specificationValue: string;
  }[] = [];
  constructor(
    private brandService: BrandsApiService,
    private categoryService: CategoriesApiService,
    private specificationService: SpecificationsService,
    private productService: ProductsApiService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  runValidation(): void {
    Object.keys(this.form.controls).forEach((ctrlName) => {
      this.form.get(ctrlName).markAsTouched();
    });
  }
  ngOnInit(): void {
    this.runValidation();
    this.brandService.getBrands().subscribe({
      next: (response) => {
        console.log(response);
        this.brands = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
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
  form: any = new FormGroup({
    productName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    brand: new FormControl('0', [
      Validators.required,
      Validators.pattern(/^[1-9]*$/),
    ]),
    category: new FormControl('0', [
      Validators.required,
      Validators.pattern(/^[1-9]*$/),
    ]),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]*$/),
    ]),
  });

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.images.push(file);
    }
  }
  addImage(): string {
    let imageUrl = '';
    const token = this.auth.getJwtToken();
    if (!token) {
      console.log('No token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(this.images[0]);
    const formData = new FormData();
    formData.append('file', this.images[0], this.images[0].name);
    this.http
      .post('https://localhost:7174/api/files', formData, { headers })
      .subscribe({
        next: (response: any) => {
          imageUrl = response.file;
          console.log(response.file);
        },
        error: (error) => console.log(error),
      });
    return imageUrl;
  }
  onChangeSpecification(event: Event) {
    const input = event.target as HTMLElement;
    const valueElement = event.target as HTMLInputElement;
    const value = valueElement.value;
    const id = Number(input.id);
    if (this.productSpecifications.find((x) => x.specificationId === id)) {
      const specExistsId = this.productSpecifications.findIndex(
        (x) => x.specificationId === id
      );
      this.productSpecifications[specExistsId].specificationValue = value;
    } else {
      this.productSpecifications.push({
        specificationId: id,
        specificationValue: value,
      });
    }
  }
  async AddProduct() {
    let imageUrl = '';
    const token = this.auth.getJwtToken();
    if (!token) {
      console.log('No token found');
      return; // Exit the function if no token is found
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {
      const formData = new FormData();
      formData.append('file', this.images[0], this.images[0].name);

      const response: any = await this.http
        .post('https://localhost:7174/api/files', formData, { headers })
        .toPromise();

      imageUrl = response.file;
      console.log(response.file);

      let data = {
        name: this.form.get('productName')?.value,
        description: this.form.get('description')?.value,
        categoryId: this.form.get('category')?.value,
        brandId: this.form.get('brand')?.value,
        price: this.form.get('price')?.value,
        images: [imageUrl],
        productSpecifications: this.productSpecifications,
      };
      this.productService.addProduct(data);

      this.productService.isFailed.subscribe((status) => {
        this.isFailed = status;
      });
      if (!this.isFailed) this.isSuccess = true;
      // this.http
      //   .post('https://localhost:7174/api/products', data, { headers })
      //   .subscribe({
      //     next: (response) => {
      //       console.log(response);
      //     },
      //     error: (error) => {
      //       console.log(error);
      //     },
      //   });
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    if (!this.isFailed) {
      this.productAdded.emit(true);
    }
  }
}
