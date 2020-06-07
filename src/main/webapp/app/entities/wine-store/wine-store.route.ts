import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWineStore, WineStore } from 'app/shared/model/wine-store.model';
import { WineStoreService } from './wine-store.service';
import { WineStoreComponent } from './wine-store.component';
import { WineStoreDetailComponent } from './wine-store-detail.component';
import { WineStoreUpdateComponent } from './wine-store-update.component';

@Injectable({ providedIn: 'root' })
export class WineStoreResolve implements Resolve<IWineStore> {
  constructor(private service: WineStoreService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWineStore> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((wineStore: HttpResponse<WineStore>) => {
          if (wineStore.body) {
            return of(wineStore.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WineStore());
  }
}

export const wineStoreRoute: Routes = [
  {
    path: '',
    component: WineStoreComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'storeApp.wineStore.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WineStoreDetailComponent,
    resolve: {
      wineStore: WineStoreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'storeApp.wineStore.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WineStoreUpdateComponent,
    resolve: {
      wineStore: WineStoreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'storeApp.wineStore.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WineStoreUpdateComponent,
    resolve: {
      wineStore: WineStoreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'storeApp.wineStore.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
