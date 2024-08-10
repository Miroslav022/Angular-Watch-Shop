import { Component } from '@angular/core';
import { IBrandPagination } from '../../../shop/interfaces/ibrand';
import { ICategoryPagination } from '../../../shop/interfaces/icategory';
import { IDataPagination } from '../../../Interfaces/IApiData';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrandsApiService } from '../../../shop/business-logic/api/brands-api.service';
import { CategoriesApiService } from '../../../shop/business-logic/api/categories-api.service';
import { SpecificationsService } from '../../../services/specifications.service';
import { ProductsApiService } from '../../../shop/business-logic/api/products-api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { IProduct } from '../../../shop/interfaces/iproduct';
import { ActivatedRoute } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { IEditProduct } from '../Interfaces/IEditProduct';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  brands: IBrandPagination;
  categories: ICategoryPagination;
  images: File[] = [];
  isFailed: boolean = false;
  isSuccess: boolean = false;
  product: IProduct | null = null;
  id: number;
  form: FormGroup;

  constructor(
    private brandService: BrandsApiService,
    private categoryService: CategoriesApiService,
    private productService: ProductsApiService,
    private http: HttpClient,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
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
  }

  ngOnInit(): void {
    this.runValidation();
    this.id = Number(this.route.snapshot.paramMap.get('id') || 0);
    this.productService.getProductById(this.id).subscribe(
      (product: any) => {
        this.product = product;
        if (this.product) {
          this.form.patchValue({
            productName: this.product.name,
            brand: this.product.brandId,
            category: this.product.categoryId,
            description: this.product.description,
            price: this.product.price,
          });
        }
      },
      (error) => console.error('Error fetching product details:', error)
    );
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
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.images.push(file);
    }
  }

  onAddedSpecification() {
    this.productService.getProductById(this.id).subscribe(
      (product: any) => {
        this.product = product;
        if (this.product) {
          this.form.patchValue({
            productName: this.product.name,
            brand: this.product.brandId,
            category: this.product.categoryId,
            description: this.product.description,
            price: this.product.price,
          });
        }
      },
      (error) => console.error('Error fetching product details:', error)
    );
  }

  runValidation(): void {
    Object.keys(this.form.controls).forEach((ctrlName) => {
      this?.form?.get(ctrlName)?.markAsTouched();
    });
  }
  update() {
    try {
      let data: IEditProduct = {
        id: this.id,
        name: this.form.get('productName')?.value,
        description: this.form.get('description')?.value,
        categoryId: this.form.get('category')?.value,
        brandId: this.form.get('brand')?.value,
        price: this.form.get('price')?.value,
      };
      this.productService.updateProduct(data).subscribe({
        next: (response) => {
          console.log(response);
          this.isSuccess = true;
        },
        error: (error) => {
          console.log(error);
          this.isFailed = true;
        },
      });
      this.productService.isFailed.subscribe((status) => {
        this.isFailed = status;
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
}
