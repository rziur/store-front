import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from 'app/shared/shared.module';
import { WineOfferComponent } from './wine-offer.component';
import { WineOfferDetailComponent } from './wine-offer-detail.component';
import { WineOfferUpdateComponent } from './wine-offer-update.component';
import { WineOfferDeleteDialogComponent } from './wine-offer-delete-dialog.component';
import { wineOfferRoute } from './wine-offer.route';

@NgModule({
  imports: [StoreSharedModule, RouterModule.forChild(wineOfferRoute)],
  declarations: [WineOfferComponent, WineOfferDetailComponent, WineOfferUpdateComponent, WineOfferDeleteDialogComponent],
  entryComponents: [WineOfferDeleteDialogComponent],
})
export class StoreWineOfferModule {}
