import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'wine-store',
        loadChildren: () => import('./wine-store/wine-store.module').then(m => m.StoreWineStoreModule),
      },
      {
        path: 'wine-store-address',
        loadChildren: () => import('./wine-store-address/wine-store-address.module').then(m => m.StoreWineStoreAddressModule),
      },
      {
        path: 'wine-stock',
        loadChildren: () => import('./wine-stock/wine-stock.module').then(m => m.StoreWineStockModule),
      },
      {
        path: 'wine-offer',
        loadChildren: () => import('./wine-offer/wine-offer.module').then(m => m.StoreWineOfferModule),
      },
      {
        path: 'wine-sale',
        loadChildren: () => import('./wine-sale/wine-sale.module').then(m => m.StoreWineSaleModule),
      },
      {
        path: 'wine-sale/customer',
        loadChildren: () => import('./wine-sale-customer/wine-sale-customer.module').then(m => m.StoreWineSaleCustomerModule),
      },
      {
        path: 'wine-customer',
        loadChildren: () => import('./wine-customer/wine-customer.module').then(m => m.StoreWineCustomerModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class StoreEntityModule {}
