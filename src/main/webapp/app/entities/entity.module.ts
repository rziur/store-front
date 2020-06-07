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
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class StoreEntityModule {}
