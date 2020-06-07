import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWineStoreAddress } from 'app/shared/model/wine-store-address.model';
import { WineStoreAddressService } from './wine-store-address.service';

@Component({
  templateUrl: './wine-store-address-delete-dialog.component.html',
})
export class WineStoreAddressDeleteDialogComponent {
  wineStoreAddress?: IWineStoreAddress;

  constructor(
    protected wineStoreAddressService: WineStoreAddressService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.wineStoreAddressService.delete(id).subscribe(() => {
      this.eventManager.broadcast('wineStoreAddressListModification');
      this.activeModal.close();
    });
  }
}
