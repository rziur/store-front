import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWineCustomer } from 'app/shared/model/wine-customer.model';

@Component({
  selector: 'jhi-wine-customer-detail',
  templateUrl: './wine-customer-detail.component.html',
})
export class WineCustomerDetailComponent implements OnInit {
  wineCustomer: IWineCustomer | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wineCustomer }) => (this.wineCustomer = wineCustomer));
  }

  previousState(): void {
    window.history.back();
  }
}
