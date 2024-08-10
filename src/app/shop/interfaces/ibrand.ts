import { IData } from '../../Interfaces/IData';

interface IBrandPagination extends IData {
  data: {
    id: number;
    brand: string;
  }[];
}

interface IBrand {
  id: number;
  brand: string;
}

export { IBrandPagination, IBrand };
