import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWineStoreAddress, WineStoreAddress } from 'app/shared/model/wine-store-address.model';
import { WineStoreAddressService } from './wine-store-address.service';
import { WineStoreAddressComponent } from './wine-store-address.component';
import { WineStoreAddressDetailComponent } from './wine-store-address-detail.component';
import { WineStoreAddressUpdateComponent } from './wine-store-address-update.component';

@Injectable({ providedIn: 'root' })
export class WineStoreAddressResolve implements Resolve<IWineStoreAddress> {
  constructor(private service: WineStoreAddressService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWineStoreAddress> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((wineStoreAddress: HttpResponse<WineStoreAddress>) => {
          if (wineStoreAddress.body) {
            return of(wineStoreAddress.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WineStoreAddress());
  }
}

export const wineStoreAddressRoute: Routes = [
  {
    path: '',
    component: WineStoreAddressComponent,
    data: {
      authorities: [Authority.USER,Authority.ADMIN],
      defaultSort: 'id,asc',
      pageTitle: 'storeApp.wineStoreAddress.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WineStoreAddressDetailComponent,
    resolve: {
      wineStoreAddress: WineStoreAddressResolve,
    },
    data: {
      authorities: [Authority.USER,Authority.ADMIN],
      pageTitle: 'storeApp.wineStoreAddress.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WineStoreAddressUpdateComponent,
    resolve: {
      wineStoreAddress: WineStoreAddressResolve,
    },
    data: {
      authorities: [Authority.USER,Authority.ADMIN],
      pageTitle: 'storeApp.wineStoreAddress.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WineStoreAddressUpdateComponent,
    resolve: {
      wineStoreAddress: WineStoreAddressResolve,
    },
    data: {
      authorities: [Authority.USER,Authority.ADMIN],
      pageTitle: 'storeApp.wineStoreAddress.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
