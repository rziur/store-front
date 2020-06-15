import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWineSale, WineSale } from 'app/shared/model/wine-sale.model';
import { WineSaleService } from './wine-sale.service';
import { WineSaleComponent } from './wine-sale.component';
import { WineSaleDetailComponent } from './wine-sale-detail.component';
import { WineSaleUpdateComponent } from './wine-sale-update.component';

@Injectable({ providedIn: 'root' })
export class WineSaleResolve implements Resolve<IWineSale> {
  constructor(private service: WineSaleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWineSale> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((wineSale: HttpResponse<WineSale>) => {
          if (wineSale.body) {
            return of(wineSale.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WineSale());
  }
}

export const wineSaleRoute: Routes = [
  {
    path: '',
    component: WineSaleComponent,
    data: {
      authorities: [Authority.ADMIN],
      defaultSort: 'id,asc',
      pageTitle: 'storeApp.wineSale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WineSaleDetailComponent,
    resolve: {
      wineSale: WineSaleResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'storeApp.wineSale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WineSaleUpdateComponent,
    resolve: {
      wineSale: WineSaleResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'storeApp.wineSale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WineSaleUpdateComponent,
    resolve: {
      wineSale: WineSaleResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'storeApp.wineSale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
