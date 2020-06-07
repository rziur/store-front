export interface IWineOffer {
  id?: number;
  isAvailable?: boolean;
  price?: number;
  specialPrice?: number;
  wineStockId?: number;
  wineStoreId?: number;
}

export class WineOffer implements IWineOffer {
  constructor(
    public id?: number,
    public isAvailable?: boolean,
    public price?: number,
    public specialPrice?: number,
    public wineStockId?: number,
    public wineStoreId?: number
  ) {
    this.isAvailable = this.isAvailable || false;
  }
}
