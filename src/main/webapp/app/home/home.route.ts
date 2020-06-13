import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';

export const HOME_ROUTE: Routes = [{
  path: '',
  component: HomeComponent,
  data: {
    authorities: [],
    defaultSort: 'id,asc',
    pageTitle: 'home.title',
  },
}];

