import { IData } from '../../Interfaces/IData';

interface ICategoryPagination extends IData {
  data: {
    id: number;
    category: string;
  }[];
}

interface ICategory {
  id: number;
  category: string;
}

export { ICategoryPagination, ICategory };
