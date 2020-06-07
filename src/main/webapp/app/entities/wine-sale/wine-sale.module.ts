import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from 'app/shared/shared.module';
import { WineSaleComponent } from './wine-sale.component';
import { WineSaleDetailComponent } from './wine-sale-detail.component';
import { WineSaleUpdateComponent } from './wine-sale-update.component';
import { WineSaleDeleteDialogComponent } from './wine-sale-delete-dialog.component';
import { wineSaleRoute } from './wine-sale.route';

@NgModule({
  imports: [StoreSharedModule, RouterModule.forChild(wineSaleRoute)],
  declarations: [WineSaleComponent, WineSaleDetailComponent, WineSaleUpdateComponent, WineSaleDeleteDialogComponent],
  entryComponents: [WineSaleDeleteDialogComponent],
})
export class StoreWineSaleModule {}
