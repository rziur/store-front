import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from 'app/shared/shared.module';
import { WineSaleCustomerRoute } from './wine-sale-customer.route';
import { WineSaleCustomerComponent } from './wine-sale-customer.component';


@NgModule({
  imports: [StoreSharedModule, RouterModule.forChild(WineSaleCustomerRoute)],
  declarations: [WineSaleCustomerComponent],
  entryComponents: [],
})
export class StoreWineSaleCustomerModule {}
