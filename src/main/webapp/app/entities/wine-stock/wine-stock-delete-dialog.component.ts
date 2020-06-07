import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWineStock } from 'app/shared/model/wine-stock.model';
import { WineStockService } from './wine-stock.service';

@Component({
  templateUrl: './wine-stock-delete-dialog.component.html',
})
export class WineStockDeleteDialogComponent {
  wineStock?: IWineStock;

  constructor(protected wineStockService: WineStockService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.wineStockService.delete(id).subscribe(() => {
      this.eventManager.broadcast('wineStockListModification');
      this.activeModal.close();
    });
  }
}
