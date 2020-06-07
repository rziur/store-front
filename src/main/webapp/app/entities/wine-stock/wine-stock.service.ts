import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWineStock } from 'app/shared/model/wine-stock.model';

type EntityResponseType = HttpResponse<IWineStock>;
type EntityArrayResponseType = HttpResponse<IWineStock[]>;

@Injectable({ providedIn: 'root' })
export class WineStockService {
  public resourceUrl = SERVER_API_URL + 'api/wine-stocks';

  constructor(protected http: HttpClient) {}

  create(wineStock: IWineStock): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wineStock);
    return this.http
      .post<IWineStock>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(wineStock: IWineStock): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wineStock);
    return this.http
      .put<IWineStock>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IWineStock>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IWineStock[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(wineStock: IWineStock): IWineStock {
    const copy: IWineStock = Object.assign({}, wineStock, {
      lastPurchaseDate:
        wineStock.lastPurchaseDate && wineStock.lastPurchaseDate.isValid() ? wineStock.lastPurchaseDate.toJSON() : undefined,
      dateImport: wineStock.dateImport && wineStock.dateImport.isValid() ? wineStock.dateImport.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.lastPurchaseDate = res.body.lastPurchaseDate ? moment(res.body.lastPurchaseDate) : undefined;
      res.body.dateImport = res.body.dateImport ? moment(res.body.dateImport) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((wineStock: IWineStock) => {
        wineStock.lastPurchaseDate = wineStock.lastPurchaseDate ? moment(wineStock.lastPurchaseDate) : undefined;
        wineStock.dateImport = wineStock.dateImport ? moment(wineStock.dateImport) : undefined;
      });
    }
    return res;
  }
}
