import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWineCustomer } from 'app/shared/model/wine-customer.model';

type EntityResponseType = HttpResponse<IWineCustomer>;
type EntityArrayResponseType = HttpResponse<IWineCustomer[]>;

@Injectable({ providedIn: 'root' })
export class WineCustomerService {
  public resourceUrl = SERVER_API_URL + 'api/wine-customers';

  constructor(protected http: HttpClient) {}

  create(wineCustomer: IWineCustomer): Observable<EntityResponseType> {
    return this.http.post<IWineCustomer>(this.resourceUrl, wineCustomer, { observe: 'response' });
  }

  update(wineCustomer: IWineCustomer): Observable<EntityResponseType> {
    return this.http.put<IWineCustomer>(this.resourceUrl, wineCustomer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWineCustomer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWineCustomer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
