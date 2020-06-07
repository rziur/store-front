import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWineOffer } from 'app/shared/model/wine-offer.model';
import { WineOfferService } from './wine-offer.service';

@Component({
  templateUrl: './wine-offer-delete-dialog.component.html',
})
export class WineOfferDeleteDialogComponent {
  wineOffer?: IWineOffer;

  constructor(protected wineOfferService: WineOfferService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.wineOfferService.delete(id).subscribe(() => {
      this.eventManager.broadcast('wineOfferListModification');
      this.activeModal.close();
    });
  }
}
