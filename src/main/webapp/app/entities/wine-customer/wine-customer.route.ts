import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWineCustomer, WineCustomer } from 'app/shared/model/wine-customer.model';
import { WineCustomerService } from './wine-customer.service';
import { WineCustomerComponent } from './wine-customer.component';
import { WineCustomerDetailComponent } from './wine-customer-detail.component';
import { WineCustomerUpdateComponent } from './wine-customer-update.component';

@Injectable({ providedIn: 'root' })
export class WineCustomerResolve implements Resolve<IWineCustomer> {
  constructor(private service: WineCustomerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWineCustomer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((wineCustomer: HttpResponse<WineCustomer>) => {
          if (wineCustomer.body) {
            return of(wineCustomer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WineCustomer());
  }
}

export const wineCustomerRoute: Routes = [
  {
    path: '',
    component: WineCustomerComponent,
    data: {
      authorities: [Authority.USER,Authority.ADMIN],
      defaultSort: 'id,asc',
      pageTitle: 'storeApp.wineCustomer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WineCustomerDetailComponent,
    resolve: {
      wineCustomer: WineCustomerResolve,
    },
    data: {
      authorities: [Authority.USER,Authority.ADMIN],
      pageTitle: 'storeApp.wineCustomer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WineCustomerUpdateComponent,
    resolve: {
      wineCustomer: WineCustomerResolve,
    },
    data: {
      authorities: [Authority.USER,Authority.ADMIN],
      pageTitle: 'storeApp.wineCustomer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WineCustomerUpdateComponent,
    resolve: {
      wineCustomer: WineCustomerResolve,
    },
    data: {
      authorities: [Authority.USER,Authority.ADMIN],
      pageTitle: 'storeApp.wineCustomer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
