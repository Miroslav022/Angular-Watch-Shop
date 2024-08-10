import { Component, Input } from '@angular/core';
import { IProduct } from '../../../shop/interfaces/iproduct';
import { ActivatedRoute } from '@angular/router';
import { SpecificationsService } from '../../../services/specifications.service';

@Component({
  selector: 'app-product-specification',
  templateUrl: './product-specification.component.html',
  styleUrl: './product-specification.component.css',
})
export class ProductSpecificationComponent {
  constructor(
    private route: ActivatedRoute,
    private specificationService: SpecificationsService
  ) {}
  @Input() product: IProduct | null;
  delete(specificationId: number) {
    const id = Number(this.route.snapshot.paramMap.get('id') || 0);
    const data = {
      productId: id,
      specificationId: specificationId,
    };
    this.specificationService.deleteProductSpecification(data).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });

    if (this.product && this.product.productSpecifications) {
      this.product.productSpecifications =
        this.product.productSpecifications.filter(
          (x) => x.specificationId !== specificationId
        );
    }
  }
}
