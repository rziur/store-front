import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWineStore } from 'app/shared/model/wine-store.model';
import { WineStoreService } from './wine-store.service';

@Component({
  templateUrl: './wine-store-delete-dialog.component.html',
})
export class WineStoreDeleteDialogComponent {
  wineStore?: IWineStore;

  constructor(protected wineStoreService: WineStoreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.wineStoreService.delete(id).subscribe(() => {
      this.eventManager.broadcast('wineStoreListModification');
      this.activeModal.close();
    });
  }
}
