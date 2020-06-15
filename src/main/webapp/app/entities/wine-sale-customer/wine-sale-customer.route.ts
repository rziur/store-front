import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWineSale, WineSale } from 'app/shared/model/wine-sale.model';
import { WineSaleCustomerComponent } from './wine-sale-customer.component';
import { WineSaleCustomerService } from './wine-sale-customer.service';


@Injectable({ providedIn: 'root' })
export class WineSaleCustomerResolve implements Resolve<IWineSale> {
  constructor(private service: WineSaleCustomerService, private router: Router) {}

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

export const WineSaleCustomerRoute: Routes = [
  {
    path: '',
    component: WineSaleCustomerComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'storeApp.wineSale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
