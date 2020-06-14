import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWineOffer, WineOffer } from 'app/shared/model/wine-offer.model';
import { WineOfferService } from './wine-offer.service';
import { WineOfferComponent } from './wine-offer.component';
import { WineOfferDetailComponent } from './wine-offer-detail.component';
import { WineOfferUpdateComponent } from './wine-offer-update.component';

@Injectable({ providedIn: 'root' })
export class WineOfferResolve implements Resolve<IWineOffer> {
  constructor(private service: WineOfferService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWineOffer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((wineOffer: HttpResponse<WineOffer>) => {
          if (wineOffer.body) {
            return of(wineOffer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WineOffer());
  }
}

export const wineOfferRoute: Routes = [
  {
    path: '',
    component: WineOfferComponent,
    data: {
      authorities: [Authority.USER,Authority.ADMIN],
      defaultSort: 'id,asc',
      pageTitle: 'storeApp.wineOffer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WineOfferDetailComponent,
    resolve: {
      wineOffer: WineOfferResolve,
    },
    data: {
      authorities: [Authority.USER,Authority.ADMIN],
      pageTitle: 'storeApp.wineOffer.home.title',
    }
  
  },
  {
    path: 'new',
    component: WineOfferUpdateComponent,
    resolve: {
      wineOffer: WineOfferResolve,
    },
    data: {
      authorities: [Authority.USER,Authority.ADMIN],
      pageTitle: 'storeApp.wineOffer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WineOfferUpdateComponent,
    resolve: {
      wineOffer: WineOfferResolve,
    },
    data: {
      authorities: [Authority.USER,Authority.ADMIN],
      pageTitle: 'storeApp.wineOffer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
