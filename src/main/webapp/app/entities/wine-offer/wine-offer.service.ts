import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWineOffer } from 'app/shared/model/wine-offer.model';

type EntityResponseType = HttpResponse<IWineOffer>;
type EntityArrayResponseType = HttpResponse<IWineOffer[]>;

@Injectable({ providedIn: 'root' })
export class WineOfferService {
  public resourceUrl = SERVER_API_URL + 'api/wine-offers';

  constructor(protected http: HttpClient) {}

  create(wineOffer: IWineOffer): Observable<EntityResponseType> {
    return this.http.post<IWineOffer>(this.resourceUrl, wineOffer, { observe: 'response' });
  }

  update(wineOffer: IWineOffer): Observable<EntityResponseType> {
    return this.http.put<IWineOffer>(this.resourceUrl, wineOffer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWineOffer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWineOffer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
