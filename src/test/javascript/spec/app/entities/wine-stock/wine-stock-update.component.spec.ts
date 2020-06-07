import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { WineStockUpdateComponent } from 'app/entities/wine-stock/wine-stock-update.component';
import { WineStockService } from 'app/entities/wine-stock/wine-stock.service';
import { WineStock } from 'app/shared/model/wine-stock.model';

describe('Component Tests', () => {
  describe('WineStock Management Update Component', () => {
    let comp: WineStockUpdateComponent;
    let fixture: ComponentFixture<WineStockUpdateComponent>;
    let service: WineStockService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [WineStockUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(WineStockUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WineStockUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WineStockService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WineStock(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new WineStock();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
