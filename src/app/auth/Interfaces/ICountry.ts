import { IData } from '../../Interfaces/IData';

interface ICountryPagination extends IData {
  data: { id: number; name: string }[];
}

interface ICountry {
  id: number;
  name: string;
}
export { ICountry, ICountryPagination };
