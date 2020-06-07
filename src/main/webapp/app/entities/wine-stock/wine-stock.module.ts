import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from 'app/shared/shared.module';
import { WineStockComponent } from './wine-stock.component';
import { WineStockDetailComponent } from './wine-stock-detail.component';
import { WineStockUpdateComponent } from './wine-stock-update.component';
import { WineStockDeleteDialogComponent } from './wine-stock-delete-dialog.component';
import { wineStockRoute } from './wine-stock.route';

@NgModule({
  imports: [StoreSharedModule, RouterModule.forChild(wineStockRoute)],
  declarations: [WineStockComponent, WineStockDetailComponent, WineStockUpdateComponent, WineStockDeleteDialogComponent],
  entryComponents: [WineStockDeleteDialogComponent],
})
export class StoreWineStockModule {}
