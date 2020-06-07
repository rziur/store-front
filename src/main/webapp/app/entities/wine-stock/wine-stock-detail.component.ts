import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWineStock } from 'app/shared/model/wine-stock.model';

@Component({
  selector: 'jhi-wine-stock-detail',
  templateUrl: './wine-stock-detail.component.html',
})
export class WineStockDetailComponent implements OnInit {
  wineStock: IWineStock | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wineStock }) => (this.wineStock = wineStock));
  }

  previousState(): void {
    window.history.back();
  }
}
