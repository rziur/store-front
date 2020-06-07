import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { WineOfferDetailComponent } from 'app/entities/wine-offer/wine-offer-detail.component';
import { WineOffer } from 'app/shared/model/wine-offer.model';

describe('Component Tests', () => {
  describe('WineOffer Management Detail Component', () => {
    let comp: WineOfferDetailComponent;
    let fixture: ComponentFixture<WineOfferDetailComponent>;
    const route = ({ data: of({ wineOffer: new WineOffer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [WineOfferDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(WineOfferDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WineOfferDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load wineOffer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.wineOffer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
