import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from 'app/shared/shared.module';
import { WineStoreComponent } from './wine-store.component';
import { WineStoreDetailComponent } from './wine-store-detail.component';
import { WineStoreUpdateComponent } from './wine-store-update.component';
import { WineStoreDeleteDialogComponent } from './wine-store-delete-dialog.component';
import { wineStoreRoute } from './wine-store.route';

@NgModule({
  imports: [StoreSharedModule, RouterModule.forChild(wineStoreRoute)],
  declarations: [WineStoreComponent, WineStoreDetailComponent, WineStoreUpdateComponent, WineStoreDeleteDialogComponent],
  entryComponents: [WineStoreDeleteDialogComponent],
})
export class StoreWineStoreModule {}
