import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWineStore } from 'app/shared/model/wine-store.model';

type EntityResponseType = HttpResponse<IWineStore>;
type EntityArrayResponseType = HttpResponse<IWineStore[]>;

@Injectable({ providedIn: 'root' })
export class WineStoreService {
  public resourceUrl = SERVER_API_URL + 'api/wine-stores';

  constructor(protected http: HttpClient) {}

  create(wineStore: IWineStore): Observable<EntityResponseType> {
    return this.http.post<IWineStore>(this.resourceUrl, wineStore, { observe: 'response' });
  }

  update(wineStore: IWineStore): Observable<EntityResponseType> {
    return this.http.put<IWineStore>(this.resourceUrl, wineStore, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWineStore>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWineStore[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
