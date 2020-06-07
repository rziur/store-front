import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWineSale } from 'app/shared/model/wine-sale.model';
import { WineSaleService } from './wine-sale.service';

@Component({
  templateUrl: './wine-sale-delete-dialog.component.html',
})
export class WineSaleDeleteDialogComponent {
  wineSale?: IWineSale;

  constructor(protected wineSaleService: WineSaleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.wineSaleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('wineSaleListModification');
      this.activeModal.close();
    });
  }
}
