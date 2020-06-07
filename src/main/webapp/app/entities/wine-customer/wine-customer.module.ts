import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from 'app/shared/shared.module';
import { WineCustomerComponent } from './wine-customer.component';
import { WineCustomerDetailComponent } from './wine-customer-detail.component';
import { WineCustomerUpdateComponent } from './wine-customer-update.component';
import { WineCustomerDeleteDialogComponent } from './wine-customer-delete-dialog.component';
import { wineCustomerRoute } from './wine-customer.route';

@NgModule({
  imports: [StoreSharedModule, RouterModule.forChild(wineCustomerRoute)],
  declarations: [WineCustomerComponent, WineCustomerDetailComponent, WineCustomerUpdateComponent, WineCustomerDeleteDialogComponent],
  entryComponents: [WineCustomerDeleteDialogComponent],
})
export class StoreWineCustomerModule {}
