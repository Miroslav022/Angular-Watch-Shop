import { IPrice } from './iprice';
import { IImage } from './iimage';

export interface IProduct {
  id: number;
  Name: string;
  Price: IPrice;
  Date: string;
  IdCategory: number;
  Popularity: number;
  Image: IImage;
  IdBrand: number;
  Characteristics: string[];
  description: string;
}
