import { Route } from '@angular/router';

import { RegisterCustomerComponent } from './register-customer.component';

export const registerCustomerRoute: Route = {
  path: 'register-customer',
  component: RegisterCustomerComponent,
  data: {
    authorities: [],
    pageTitle: 'register.title',
  },
};
