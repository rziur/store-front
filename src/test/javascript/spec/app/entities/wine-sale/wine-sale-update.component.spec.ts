import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { WineSaleUpdateComponent } from 'app/entities/wine-sale/wine-sale-update.component';
import { WineSaleService } from 'app/entities/wine-sale/wine-sale.service';
import { WineSale } from 'app/shared/model/wine-sale.model';

describe('Component Tests', () => {
  describe('WineSale Management Update Component', () => {
    let comp: WineSaleUpdateComponent;
    let fixture: ComponentFixture<WineSaleUpdateComponent>;
    let service: WineSaleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [WineSaleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(WineSaleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WineSaleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WineSaleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WineSale(123);
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
        const entity = new WineSale();
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
