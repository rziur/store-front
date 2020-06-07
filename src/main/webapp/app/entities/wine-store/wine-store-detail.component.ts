import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWineStore } from 'app/shared/model/wine-store.model';

@Component({
  selector: 'jhi-wine-store-detail',
  templateUrl: './wine-store-detail.component.html',
})
export class WineStoreDetailComponent implements OnInit {
  wineStore: IWineStore | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wineStore }) => (this.wineStore = wineStore));
  }

  previousState(): void {
    window.history.back();
  }
}
