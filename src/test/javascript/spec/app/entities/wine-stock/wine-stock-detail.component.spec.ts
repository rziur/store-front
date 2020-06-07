import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { WineStockDetailComponent } from 'app/entities/wine-stock/wine-stock-detail.component';
import { WineStock } from 'app/shared/model/wine-stock.model';

describe('Component Tests', () => {
  describe('WineStock Management Detail Component', () => {
    let comp: WineStockDetailComponent;
    let fixture: ComponentFixture<WineStockDetailComponent>;
    const route = ({ data: of({ wineStock: new WineStock(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [WineStockDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(WineStockDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WineStockDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load wineStock on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.wineStock).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
