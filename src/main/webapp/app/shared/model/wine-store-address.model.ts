export interface IWineStoreAddress {
  id?: number;
  street?: string;
  postcode?: string;
  city?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  wineStoreId?: number;
}

export class WineStoreAddress implements IWineStoreAddress {
  constructor(
    public id?: number,
    public street?: string,
    public postcode?: string,
    public city?: string,
    public region?: string,
    public latitude?: number,
    public longitude?: number,
    public wineStoreId?: number
  ) {}
}
