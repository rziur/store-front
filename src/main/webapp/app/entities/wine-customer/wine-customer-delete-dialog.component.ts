import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWineCustomer } from 'app/shared/model/wine-customer.model';
import { WineCustomerService } from './wine-customer.service';

@Component({
  templateUrl: './wine-customer-delete-dialog.component.html',
})
export class WineCustomerDeleteDialogComponent {
  wineCustomer?: IWineCustomer;

  constructor(
    protected wineCustomerService: WineCustomerService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.wineCustomerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('wineCustomerListModification');
      this.activeModal.close();
    });
  }
}
