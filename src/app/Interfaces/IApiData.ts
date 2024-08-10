import { IData } from './IData';

interface IDataPagination extends IData {
  data: { id: number; name: string }[];
}

interface IDataApi {
  id: number;
  name: string;
}
export { IDataApi, IDataPagination };
