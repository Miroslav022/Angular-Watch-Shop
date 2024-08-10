import { IDataApi } from '../../Interfaces/IApiData';
import { IData } from '../../Interfaces/IData';

interface ICityPagination extends IData {
  data: {
    id: number;
    city: string;
    country: IDataApi;
  }[];
}

interface ICity {
  id: number;
  city: string;
  country: IDataApi;
}

export { ICityPagination, ICity };
