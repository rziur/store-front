import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWineSale } from 'app/shared/model/wine-sale.model';

type EntityResponseType = HttpResponse<IWineSale>;
type EntityArrayResponseType = HttpResponse<IWineSale[]>;

@Injectable({ providedIn: 'root' })
export class WineSaleService {
  public resourceUrl = SERVER_API_URL + 'api/wine-sales';

  constructor(protected http: HttpClient) {}

  create(wineSale: IWineSale): Observable<EntityResponseType> {
    return this.http.post<IWineSale>(this.resourceUrl, wineSale, { observe: 'response' });
  }

  update(wineSale: IWineSale): Observable<EntityResponseType> {
    return this.http.put<IWineSale>(this.resourceUrl, wineSale, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWineSale>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWineSale[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
