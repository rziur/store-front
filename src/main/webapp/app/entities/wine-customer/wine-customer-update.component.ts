import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { LANGUAGES } from 'app/core/language/language.constants';
import { IWineCustomer, WineCustomer } from 'app/shared/model/wine-customer.model';
import { WineCustomerService } from './wine-customer.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-wine-customer-update',
  templateUrl: './wine-customer-update.component.html',
})
export class WineCustomerUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  languages = LANGUAGES;
  
  editForm = this.fb.group({
    id: [],
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    firstName: ['', [Validators.maxLength(50)]],
    lastName: ['', [Validators.maxLength(50)]],
    email: ['', [Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    activated: [],
    langKey: [],
    address: [],
    phone: [],
    userId: [],
  });

  constructor(
    protected wineCustomerService: WineCustomerService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wineCustomer }) => {
      this.updateForm(wineCustomer);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(wineCustomer: IWineCustomer): void {
    this.editForm.patchValue({
      id: wineCustomer.id,
      login: wineCustomer.login,
      firstName: wineCustomer.firstName,
      lastName: wineCustomer.lastName,
      email: wineCustomer.email,
      activated: wineCustomer.activated,
      langKey: wineCustomer.langKey,
      address: wineCustomer.address,
      phone: wineCustomer.phone,
      userId: wineCustomer.userId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const wineCustomer = this.createFromForm();
    if (wineCustomer.id !== undefined) {
      this.subscribeToSaveResponse(this.wineCustomerService.update(wineCustomer));
    } else {
      this.subscribeToSaveResponse(this.wineCustomerService.create(wineCustomer));
    }
  }

  private createFromForm(): IWineCustomer {
    return {
      ...new WineCustomer(),
      id: this.editForm.get(['id'])!.value,
      address: this.editForm.get(['address'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      login: this.editForm.get(['login'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      activated: this.editForm.get(['activated'])!.value,
      langKey: this.editForm.get(['langKey'])!.value
 
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWineCustomer>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
