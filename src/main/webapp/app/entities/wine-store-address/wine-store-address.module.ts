import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from 'app/shared/shared.module';
import { WineStoreAddressComponent } from './wine-store-address.component';
import { WineStoreAddressDetailComponent } from './wine-store-address-detail.component';
import { WineStoreAddressUpdateComponent } from './wine-store-address-update.component';
import { WineStoreAddressDeleteDialogComponent } from './wine-store-address-delete-dialog.component';
import { wineStoreAddressRoute } from './wine-store-address.route';

@NgModule({
  imports: [StoreSharedModule, RouterModule.forChild(wineStoreAddressRoute)],
  declarations: [
    WineStoreAddressComponent,
    WineStoreAddressDetailComponent,
    WineStoreAddressUpdateComponent,
    WineStoreAddressDeleteDialogComponent,
  ],
  entryComponents: [WineStoreAddressDeleteDialogComponent],
})
export class StoreWineStoreAddressModule {}
