import { IData } from '../../Interfaces/IData';
import { IImage } from './iimage';

interface IProductPagination extends IData {
  data: IProduct[];
}

interface IProduct {
  id: number;
  name: string;
  price: number;
  priceId: number;
  date: string;
  category: string;
  categoryId: number;
  popularity: number;
  images: IImage[];
  brand: string;
  brandId: number;
  productSpecifications: {
    specificationId: number;
    value: string;
    specification: string;
  }[];
  description: string;
  recensions: {
    id: number;
    title: string;
    description: string;
    username: string;
  }[];
}

export { IProduct, IProductPagination };
