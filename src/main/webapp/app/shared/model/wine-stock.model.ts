import { Moment } from 'moment';

export interface IWineStock {
  id?: number;
  supplier?: string;
  region?: string;
  description?: string;
  vintage?: string;
  alcoholLevel?: number;
  printRun?: string;
  price?: number;
  physical?: number;
  purchases?: number;
  sales?: number;
  availability?: number;
  pxRevCol?: number;
  lastPurchasePrice?: number;
  lastPurchaseDate?: Moment;
  dateImport?: Moment;
  imageUrl?: string;
  rating?: number;
}

export class WineStock implements IWineStock {
  constructor(
    public id?: number,
    public supplier?: string,
    public region?: string,
    public description?: string,
    public vintage?: string,
    public alcoholLevel?: number,
    public printRun?: string,
    public price?: number,
    public physical?: number,
    public purchases?: number,
    public sales?: number,
    public availability?: number,
    public pxRevCol?: number,
    public lastPurchasePrice?: number,
    public lastPurchaseDate?: Moment,
    public dateImport?: Moment,
    public imageUrl?: string,
    public rating?: number
  ) {}
}
