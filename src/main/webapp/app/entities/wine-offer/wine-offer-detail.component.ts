import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWineOffer } from 'app/shared/model/wine-offer.model';

@Component({
  selector: 'jhi-wine-offer-detail',
  templateUrl: './wine-offer-detail.component.html',
})
export class WineOfferDetailComponent implements OnInit {
  wineOffer: IWineOffer | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wineOffer }) => (this.wineOffer = wineOffer));
  }

  previousState(): void {
    window.history.back();
  }
}
