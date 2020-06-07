import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { WineOfferUpdateComponent } from 'app/entities/wine-offer/wine-offer-update.component';
import { WineOfferService } from 'app/entities/wine-offer/wine-offer.service';
import { WineOffer } from 'app/shared/model/wine-offer.model';

describe('Component Tests', () => {
  describe('WineOffer Management Update Component', () => {
    let comp: WineOfferUpdateComponent;
    let fixture: ComponentFixture<WineOfferUpdateComponent>;
    let service: WineOfferService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [WineOfferUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(WineOfferUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WineOfferUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WineOfferService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WineOffer(123);
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
        const entity = new WineOffer();
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
