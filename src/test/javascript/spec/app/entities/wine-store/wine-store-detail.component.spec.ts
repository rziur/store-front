import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { WineStoreDetailComponent } from 'app/entities/wine-store/wine-store-detail.component';
import { WineStore } from 'app/shared/model/wine-store.model';

describe('Component Tests', () => {
  describe('WineStore Management Detail Component', () => {
    let comp: WineStoreDetailComponent;
    let fixture: ComponentFixture<WineStoreDetailComponent>;
    const route = ({ data: of({ wineStore: new WineStore(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [WineStoreDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(WineStoreDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WineStoreDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load wineStore on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.wineStore).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
