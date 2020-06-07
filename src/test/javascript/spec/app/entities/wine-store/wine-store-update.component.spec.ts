import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { WineStoreUpdateComponent } from 'app/entities/wine-store/wine-store-update.component';
import { WineStoreService } from 'app/entities/wine-store/wine-store.service';
import { WineStore } from 'app/shared/model/wine-store.model';

describe('Component Tests', () => {
  describe('WineStore Management Update Component', () => {
    let comp: WineStoreUpdateComponent;
    let fixture: ComponentFixture<WineStoreUpdateComponent>;
    let service: WineStoreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [WineStoreUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(WineStoreUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WineStoreUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WineStoreService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WineStore(123);
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
        const entity = new WineStore();
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
