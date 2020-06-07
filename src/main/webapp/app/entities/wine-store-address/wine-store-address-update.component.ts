import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IWineStoreAddress, WineStoreAddress } from 'app/shared/model/wine-store-address.model';
import { WineStoreAddressService } from './wine-store-address.service';
import { IWineStore } from 'app/shared/model/wine-store.model';
import { WineStoreService } from 'app/entities/wine-store/wine-store.service';

@Component({
  selector: 'jhi-wine-store-address-update',
  templateUrl: './wine-store-address-update.component.html',
})
export class WineStoreAddressUpdateComponent implements OnInit {
  isSaving = false;
  winestores: IWineStore[] = [];

  editForm = this.fb.group({
    id: [],
    street: [],
    postcode: [],
    city: [],
    region: [],
    latitude: [],
    longitude: [],
    wineStoreId: [],
  });

  constructor(
    protected wineStoreAddressService: WineStoreAddressService,
    protected wineStoreService: WineStoreService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wineStoreAddress }) => {
      this.updateForm(wineStoreAddress);

      this.wineStoreService
        .query({ 'wineStoreAddressId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IWineStore[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IWineStore[]) => {
          if (!wineStoreAddress.wineStoreId) {
            this.winestores = resBody;
          } else {
            this.wineStoreService
              .find(wineStoreAddress.wineStoreId)
              .pipe(
                map((subRes: HttpResponse<IWineStore>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IWineStore[]) => (this.winestores = concatRes));
          }
        });
    });
  }

  updateForm(wineStoreAddress: IWineStoreAddress): void {
    this.editForm.patchValue({
      id: wineStoreAddress.id,
      street: wineStoreAddress.street,
      postcode: wineStoreAddress.postcode,
      city: wineStoreAddress.city,
      region: wineStoreAddress.region,
      latitude: wineStoreAddress.latitude,
      longitude: wineStoreAddress.longitude,
      wineStoreId: wineStoreAddress.wineStoreId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const wineStoreAddress = this.createFromForm();
    if (wineStoreAddress.id !== undefined) {
      this.subscribeToSaveResponse(this.wineStoreAddressService.update(wineStoreAddress));
    } else {
      this.subscribeToSaveResponse(this.wineStoreAddressService.create(wineStoreAddress));
    }
  }

  private createFromForm(): IWineStoreAddress {
    return {
      ...new WineStoreAddress(),
      id: this.editForm.get(['id'])!.value,
      street: this.editForm.get(['street'])!.value,
      postcode: this.editForm.get(['postcode'])!.value,
      city: this.editForm.get(['city'])!.value,
      region: this.editForm.get(['region'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      wineStoreId: this.editForm.get(['wineStoreId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWineStoreAddress>>): void {
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

  trackById(index: number, item: IWineStore): any {
    return item.id;
  }
}
