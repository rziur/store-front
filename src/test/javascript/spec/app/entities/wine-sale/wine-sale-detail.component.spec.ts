import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { WineSaleDetailComponent } from 'app/entities/wine-sale/wine-sale-detail.component';
import { WineSale } from 'app/shared/model/wine-sale.model';

describe('Component Tests', () => {
  describe('WineSale Management Detail Component', () => {
    let comp: WineSaleDetailComponent;
    let fixture: ComponentFixture<WineSaleDetailComponent>;
    const route = ({ data: of({ wineSale: new WineSale(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [WineSaleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(WineSaleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WineSaleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load wineSale on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.wineSale).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
