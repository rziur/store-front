export interface IWineOffer {
  id?: number;
  isAvailable?: boolean;
  price?: number;
  specialPrice?: number;
  wineStockId?: number;
  wineStoreId?: number;
  wineStockSupplier?: string;
  wineStockRegion?: string;
  wineStockDescription?: string;
  wineStockImageUrl?: string;
  wineStockRating?: any;
  wineStoreName?: string;
  wineStoreDescription?: string;
  wineStoreRating?: number;
  wineStockName?: string;
  wineStockVoteCount?: number;

}

export class WineOffer implements IWineOffer {
  constructor(
    public id?: number,
    public isAvailable?: boolean,
    public price?: number,
    public specialPrice?: number,
    public wineStockId?: number,
    public wineStoreId?: number,
    public wineStockSupplier?: string,
    public wineStockRegion?: string,
    public wineStockDescription?: string,
    public wineStockImageUrl?: string,
    public wineStockRating?: any,
    public wineStoreName?: string,
    public wineStoreDescription?: string,
    public wineStoreRating?: number,
    public wineStockName?: string,
    public wineStockVoteCount?: number
  ) {
    this.isAvailable = this.isAvailable || false;
  }
}
