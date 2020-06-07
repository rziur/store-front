import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWineStock, WineStock } from 'app/shared/model/wine-stock.model';
import { WineStockService } from './wine-stock.service';
import { WineStockComponent } from './wine-stock.component';
import { WineStockDetailComponent } from './wine-stock-detail.component';
import { WineStockUpdateComponent } from './wine-stock-update.component';

@Injectable({ providedIn: 'root' })
export class WineStockResolve implements Resolve<IWineStock> {
  constructor(private service: WineStockService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWineStock> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((wineStock: HttpResponse<WineStock>) => {
          if (wineStock.body) {
            return of(wineStock.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WineStock());
  }
}

export const wineStockRoute: Routes = [
  {
    path: '',
    component: WineStockComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'storeApp.wineStock.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WineStockDetailComponent,
    resolve: {
      wineStock: WineStockResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'storeApp.wineStock.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WineStockUpdateComponent,
    resolve: {
      wineStock: WineStockResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'storeApp.wineStock.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WineStockUpdateComponent,
    resolve: {
      wineStock: WineStockResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'storeApp.wineStock.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
