import { IProduct } from '../../shop/interfaces/iproduct';

export interface IProductInCart {
  product: IProduct;
  qty: number;
}
