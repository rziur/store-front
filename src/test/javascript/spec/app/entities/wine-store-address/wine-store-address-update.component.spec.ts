import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { WineStoreAddressUpdateComponent } from 'app/entities/wine-store-address/wine-store-address-update.component';
import { WineStoreAddressService } from 'app/entities/wine-store-address/wine-store-address.service';
import { WineStoreAddress } from 'app/shared/model/wine-store-address.model';

describe('Component Tests', () => {
  describe('WineStoreAddress Management Update Component', () => {
    let comp: WineStoreAddressUpdateComponent;
    let fixture: ComponentFixture<WineStoreAddressUpdateComponent>;
    let service: WineStoreAddressService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [WineStoreAddressUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(WineStoreAddressUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WineStoreAddressUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WineStoreAddressService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WineStoreAddress(123);
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
        const entity = new WineStoreAddress();
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
