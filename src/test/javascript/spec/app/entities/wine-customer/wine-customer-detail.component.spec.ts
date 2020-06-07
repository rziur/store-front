import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { WineCustomerDetailComponent } from 'app/entities/wine-customer/wine-customer-detail.component';
import { WineCustomer } from 'app/shared/model/wine-customer.model';

describe('Component Tests', () => {
  describe('WineCustomer Management Detail Component', () => {
    let comp: WineCustomerDetailComponent;
    let fixture: ComponentFixture<WineCustomerDetailComponent>;
    const route = ({ data: of({ wineCustomer: new WineCustomer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [WineCustomerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(WineCustomerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WineCustomerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load wineCustomer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.wineCustomer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
