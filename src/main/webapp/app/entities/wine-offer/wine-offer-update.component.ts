import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IWineOffer, WineOffer } from 'app/shared/model/wine-offer.model';
import { WineOfferService } from './wine-offer.service';
import { IWineStock } from 'app/shared/model/wine-stock.model';
import { WineStockService } from 'app/entities/wine-stock/wine-stock.service';
import { IWineStore } from 'app/shared/model/wine-store.model';
import { WineStoreService } from 'app/entities/wine-store/wine-store.service';

type SelectableEntity = IWineStock | IWineStore;

@Component({
  selector: 'jhi-wine-offer-update',
  templateUrl: './wine-offer-update.component.html',
})
export class WineOfferUpdateComponent implements OnInit {
  isSaving = false;
  winestocks: IWineStock[] = [];
  winestores: IWineStore[] = [];

  editForm = this.fb.group({
    id: [],
    isAvailable: [],
    price: [],
    specialPrice: [],
    wineStockId: [],
    wineStoreId: [],
  });

  constructor(
    protected wineOfferService: WineOfferService,
    protected wineStockService: WineStockService,
    protected wineStoreService: WineStoreService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wineOffer }) => {
      this.updateForm(wineOffer);

      this.wineStockService.query().subscribe((res: HttpResponse<IWineStock[]>) => (this.winestocks = res.body || []));

      this.wineStoreService.query().subscribe((res: HttpResponse<IWineStore[]>) => (this.winestores = res.body || []));
    });
  }

  updateForm(wineOffer: IWineOffer): void {
    this.editForm.patchValue({
      id: wineOffer.id,
      isAvailable: wineOffer.isAvailable,
      price: wineOffer.price,
      specialPrice: wineOffer.specialPrice,
      wineStockId: wineOffer.wineStockId,
      wineStoreId: wineOffer.wineStoreId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const wineOffer = this.createFromForm();
    if (wineOffer.id !== undefined) {
      this.subscribeToSaveResponse(this.wineOfferService.update(wineOffer));
    } else {
      this.subscribeToSaveResponse(this.wineOfferService.create(wineOffer));
    }
  }

  private createFromForm(): IWineOffer {
    return {
      ...new WineOffer(),
      id: this.editForm.get(['id'])!.value,
      isAvailable: this.editForm.get(['isAvailable'])!.value,
      price: this.editForm.get(['price'])!.value,
      specialPrice: this.editForm.get(['specialPrice'])!.value,
      wineStockId: this.editForm.get(['wineStockId'])!.value,
      wineStoreId: this.editForm.get(['wineStoreId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWineOffer>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
