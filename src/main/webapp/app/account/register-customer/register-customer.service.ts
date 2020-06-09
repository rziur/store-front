import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { ICustomer } from 'app/core/user/customer.model';

@Injectable({ providedIn: 'root' })
export class RegisterCustomerService {
  constructor(private http: HttpClient) {}

  save(account: ICustomer): Observable<{}> {
    return this.http.post(SERVER_API_URL + 'api/register-customer', account);
  }
}
