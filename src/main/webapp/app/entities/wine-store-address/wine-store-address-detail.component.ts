import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWineStoreAddress } from 'app/shared/model/wine-store-address.model';

@Component({
  selector: 'jhi-wine-store-address-detail',
  templateUrl: './wine-store-address-detail.component.html',
})
export class WineStoreAddressDetailComponent implements OnInit {
  wineStoreAddress: IWineStoreAddress | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wineStoreAddress }) => (this.wineStoreAddress = wineStoreAddress));
  }

  previousState(): void {
    window.history.back();
  }
}
