import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IWineStock, WineStock } from 'app/shared/model/wine-stock.model';
import { WineStockService } from './wine-stock.service';

@Component({
  selector: 'jhi-wine-stock-update',
  templateUrl: './wine-stock-update.component.html',
})
export class WineStockUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    supplier: [],
    region: [],
    description: [],
    vintage: [],
    alcoholLevel: [null, [Validators.min(0), Validators.max(90)]],
    printRun: [],
    price: [],
    physical: [],
    purchases: [],
    sales: [],
    availability: [],
    pxRevCol: [],
    lastPurchasePrice: [],
    lastPurchaseDate: [],
    dateImport: [],
    imageUrl: [],
    rating: [null, [Validators.min(1), Validators.max(5)]],
  });

  constructor(protected wineStockService: WineStockService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wineStock }) => {
      if (!wineStock.id) {
        const today = moment().startOf('day');
        wineStock.lastPurchaseDate = today;
        wineStock.dateImport = today;
      }

      this.updateForm(wineStock);
    });
  }

  updateForm(wineStock: IWineStock): void {
    this.editForm.patchValue({
      id: wineStock.id,
      supplier: wineStock.supplier,
      region: wineStock.region,
      description: wineStock.description,
      vintage: wineStock.vintage,
      alcoholLevel: wineStock.alcoholLevel,
      printRun: wineStock.printRun,
      price: wineStock.price,
      physical: wineStock.physical,
      purchases: wineStock.purchases,
      sales: wineStock.sales,
      availability: wineStock.availability,
      pxRevCol: wineStock.pxRevCol,
      lastPurchasePrice: wineStock.lastPurchasePrice,
      lastPurchaseDate: wineStock.lastPurchaseDate ? wineStock.lastPurchaseDate.format(DATE_TIME_FORMAT) : null,
      dateImport: wineStock.dateImport ? wineStock.dateImport.format(DATE_TIME_FORMAT) : null,
      imageUrl: wineStock.imageUrl,
      rating: wineStock.rating,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const wineStock = this.createFromForm();
    if (wineStock.id !== undefined) {
      this.subscribeToSaveResponse(this.wineStockService.update(wineStock));
    } else {
      this.subscribeToSaveResponse(this.wineStockService.create(wineStock));
    }
  }

  private createFromForm(): IWineStock {
    return {
      ...new WineStock(),
      id: this.editForm.get(['id'])!.value,
      supplier: this.editForm.get(['supplier'])!.value,
      region: this.editForm.get(['region'])!.value,
      description: this.editForm.get(['description'])!.value,
      vintage: this.editForm.get(['vintage'])!.value,
      alcoholLevel: this.editForm.get(['alcoholLevel'])!.value,
      printRun: this.editForm.get(['printRun'])!.value,
      price: this.editForm.get(['price'])!.value,
      physical: this.editForm.get(['physical'])!.value,
      purchases: this.editForm.get(['purchases'])!.value,
      sales: this.editForm.get(['sales'])!.value,
      availability: this.editForm.get(['availability'])!.value,
      pxRevCol: this.editForm.get(['pxRevCol'])!.value,
      lastPurchasePrice: this.editForm.get(['lastPurchasePrice'])!.value,
      lastPurchaseDate: this.editForm.get(['lastPurchaseDate'])!.value
        ? moment(this.editForm.get(['lastPurchaseDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateImport: this.editForm.get(['dateImport'])!.value ? moment(this.editForm.get(['dateImport'])!.value, DATE_TIME_FORMAT) : undefined,
      imageUrl: this.editForm.get(['imageUrl'])!.value,
      rating: this.editForm.get(['rating'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWineStock>>): void {
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
}
