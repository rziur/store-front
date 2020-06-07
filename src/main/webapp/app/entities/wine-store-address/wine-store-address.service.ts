import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWineStoreAddress } from 'app/shared/model/wine-store-address.model';

type EntityResponseType = HttpResponse<IWineStoreAddress>;
type EntityArrayResponseType = HttpResponse<IWineStoreAddress[]>;

@Injectable({ providedIn: 'root' })
export class WineStoreAddressService {
  public resourceUrl = SERVER_API_URL + 'api/wine-store-addresses';

  constructor(protected http: HttpClient) {}

  create(wineStoreAddress: IWineStoreAddress): Observable<EntityResponseType> {
    return this.http.post<IWineStoreAddress>(this.resourceUrl, wineStoreAddress, { observe: 'response' });
  }

  update(wineStoreAddress: IWineStoreAddress): Observable<EntityResponseType> {
    return this.http.put<IWineStoreAddress>(this.resourceUrl, wineStoreAddress, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWineStoreAddress>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWineStoreAddress[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
