import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWineSale } from 'app/shared/model/wine-sale.model';

type EntityResponseType = HttpResponse<IWineSale>;
type EntityArrayResponseType = HttpResponse<IWineSale[]>;

@Injectable({ providedIn: 'root' })
export class WineSaleCustomerService {
  public resourceUrl = SERVER_API_URL + 'api/wine-sales';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWineSale>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWineSale[]>(this.resourceUrl + '/customer', { params: options, observe: 'response' });
  }

}
