import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { WineStoreAddressDetailComponent } from 'app/entities/wine-store-address/wine-store-address-detail.component';
import { WineStoreAddress } from 'app/shared/model/wine-store-address.model';

describe('Component Tests', () => {
  describe('WineStoreAddress Management Detail Component', () => {
    let comp: WineStoreAddressDetailComponent;
    let fixture: ComponentFixture<WineStoreAddressDetailComponent>;
    const route = ({ data: of({ wineStoreAddress: new WineStoreAddress(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [WineStoreAddressDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(WineStoreAddressDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WineStoreAddressDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load wineStoreAddress on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.wineStoreAddress).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
