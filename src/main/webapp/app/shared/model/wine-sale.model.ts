export interface IWineSale {
  id?: number;
  shippingDescription?: string;
  shippingAmount?: number;
  discount?: number;
  total?: number;
  state?: number;
  wineCustomerId?: number;
  wineStockId?: number;
  wineStoreId?: number;
}

export class WineSale implements IWineSale {
  constructor(
    public id?: number,
    public shippingDescription?: string,
    public shippingAmount?: number,
    public discount?: number,
    public total?: number,
    public state?: number,
    public wineCustomerId?: number,
    public wineStockId?: number,
    public wineStoreId?: number
  ) {}
}
