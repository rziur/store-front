import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IWineSale, WineSale } from 'app/shared/model/wine-sale.model';
import { WineSaleService } from './wine-sale.service';
import { IWineCustomer } from 'app/shared/model/wine-customer.model';
import { WineCustomerService } from 'app/entities/wine-customer/wine-customer.service';
import { IWineStock } from 'app/shared/model/wine-stock.model';
import { WineStockService } from 'app/entities/wine-stock/wine-stock.service';
import { IWineStore } from 'app/shared/model/wine-store.model';
import { WineStoreService } from 'app/entities/wine-store/wine-store.service';

type SelectableEntity = IWineCustomer | IWineStock | IWineStore;

@Component({
  selector: 'jhi-wine-sale-update',
  templateUrl: './wine-sale-update.component.html',
})
export class WineSaleUpdateComponent implements OnInit {
  isSaving = false;
  winecustomers: IWineCustomer[] = [];
  winestocks: IWineStock[] = [];
  winestores: IWineStore[] = [];

  editForm = this.fb.group({
    id: [],
    shippingDescription: [],
    shippingAmount: [],
    discount: [],
    total: [],
    state: [],
    wineCustomerId: [],
    wineStockId: [],
    wineStoreId: [],
  });

  constructor(
    protected wineSaleService: WineSaleService,
    protected wineCustomerService: WineCustomerService,
    protected wineStockService: WineStockService,
    protected wineStoreService: WineStoreService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wineSale }) => {
      this.updateForm(wineSale);

      this.wineCustomerService.query().subscribe((res: HttpResponse<IWineCustomer[]>) => (this.winecustomers = res.body || []));

      this.wineStockService.query().subscribe((res: HttpResponse<IWineStock[]>) => (this.winestocks = res.body || []));

      this.wineStoreService.query().subscribe((res: HttpResponse<IWineStore[]>) => (this.winestores = res.body || []));
    });
  }

  updateForm(wineSale: IWineSale): void {
    this.editForm.patchValue({
      id: wineSale.id,
      shippingDescription: wineSale.shippingDescription,
      shippingAmount: wineSale.shippingAmount,
      discount: wineSale.discount,
      total: wineSale.total,
      state: wineSale.state,
      wineCustomerId: wineSale.wineCustomerId,
      wineStockId: wineSale.wineStockId,
      wineStoreId: wineSale.wineStoreId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const wineSale = this.createFromForm();
    if (wineSale.id !== undefined) {
      this.subscribeToSaveResponse(this.wineSaleService.update(wineSale));
    } else {
      this.subscribeToSaveResponse(this.wineSaleService.create(wineSale));
    }
  }

  private createFromForm(): IWineSale {
    return {
      ...new WineSale(),
      id: this.editForm.get(['id'])!.value,
      shippingDescription: this.editForm.get(['shippingDescription'])!.value,
      shippingAmount: this.editForm.get(['shippingAmount'])!.value,
      discount: this.editForm.get(['discount'])!.value,
      total: this.editForm.get(['total'])!.value,
      state: this.editForm.get(['state'])!.value,
      wineCustomerId: this.editForm.get(['wineCustomerId'])!.value,
      wineStockId: this.editForm.get(['wineStockId'])!.value,
      wineStoreId: this.editForm.get(['wineStoreId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWineSale>>): void {
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
