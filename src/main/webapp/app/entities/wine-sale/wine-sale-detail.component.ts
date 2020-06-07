import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWineSale } from 'app/shared/model/wine-sale.model';

@Component({
  selector: 'jhi-wine-sale-detail',
  templateUrl: './wine-sale-detail.component.html',
})
export class WineSaleDetailComponent implements OnInit {
  wineSale: IWineSale | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wineSale }) => (this.wineSale = wineSale));
  }

  previousState(): void {
    window.history.back();
  }
}
