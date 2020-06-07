import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IWineStore, WineStore } from 'app/shared/model/wine-store.model';
import { WineStoreService } from './wine-store.service';

@Component({
  selector: 'jhi-wine-store-update',
  templateUrl: './wine-store-update.component.html',
})
export class WineStoreUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    rating: [null, [Validators.min(1), Validators.max(5)]],
  });

  constructor(protected wineStoreService: WineStoreService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wineStore }) => {
      this.updateForm(wineStore);
    });
  }

  updateForm(wineStore: IWineStore): void {
    this.editForm.patchValue({
      id: wineStore.id,
      name: wineStore.name,
      description: wineStore.description,
      rating: wineStore.rating,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const wineStore = this.createFromForm();
    if (wineStore.id !== undefined) {
      this.subscribeToSaveResponse(this.wineStoreService.update(wineStore));
    } else {
      this.subscribeToSaveResponse(this.wineStoreService.create(wineStore));
    }
  }

  private createFromForm(): IWineStore {
    return {
      ...new WineStore(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      rating: this.editForm.get(['rating'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWineStore>>): void {
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
