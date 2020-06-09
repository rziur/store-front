import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

import { LANGUAGES } from 'app/core/language/language.constants';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared/constants/error.constants';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { RegisterCustomerService } from './register-customer.service';


@Component({
  selector: 'jhi-register',
  templateUrl: './register-customer.component.html',
})
export class RegisterCustomerComponent implements AfterViewInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  languages = LANGUAGES;
  authorities: string[] = [];

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  registerCustomerForm = this.fb.group({
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    firstName: ['', [Validators.required], [Validators.maxLength(50)]],
    lastName: ['', [Validators.required], [Validators.maxLength(50)]],
    activated: [],
    langKey: [],
    address: ['', [Validators.required, Validators.maxLength(254)]],
    phone: ['', [Validators.required]],
  });

  constructor(
    private loginModalService: LoginModalService,
    private registerService: RegisterCustomerService,
    private fb: FormBuilder
  ) {}

  ngAfterViewInit(): void {
    if (this.login) {
      this.login.nativeElement.focus();
    }
  }

  registerCustomer(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    const password = this.registerCustomerForm.get(['password'])!.value;
    if (password !== this.registerCustomerForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {
      const login = this.registerCustomerForm.get(['login'])!.value;
      const email = this.registerCustomerForm.get(['email'])!.value;
      const firstName = this.registerCustomerForm.get(['firstName'])!.value;
      const lastName = this.registerCustomerForm.get(['lastName'])!.value;
      const activated = this.registerCustomerForm.get(['activated'])!.value;
      const langKey = this.registerCustomerForm.get(['langKey'])!.value;
      const address = this.registerCustomerForm.get(['address'])!.value;
      const phone = this.registerCustomerForm.get(['phone'])!.value;

      this.registerService.save(
        { login, 
          email, 
          password,
          firstName, 
          lastName,
          langKey,
          address,
          phone,
          activated
        }).subscribe(
        () => (this.success = true),
        response => this.processError(response)
      );
    }
  }

  openLogin(): void {
    this.loginModalService.open();
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }
}
