import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { WineStockService } from 'app/entities/wine-stock/wine-stock.service';
import { IWineStock, WineStock } from 'app/shared/model/wine-stock.model';

describe('Service Tests', () => {
  describe('WineStock Service', () => {
    let injector: TestBed;
    let service: WineStockService;
    let httpMock: HttpTestingController;
    let elemDefault: IWineStock;
    let expectedResult: IWineStock | IWineStock[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(WineStockService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new WineStock(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        currentDate,
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            lastPurchaseDate: currentDate.format(DATE_TIME_FORMAT),
            dateImport: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a WineStock', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            lastPurchaseDate: currentDate.format(DATE_TIME_FORMAT),
            dateImport: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastPurchaseDate: currentDate,
            dateImport: currentDate,
          },
          returnedFromService
        );

        service.create(new WineStock()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a WineStock', () => {
        const returnedFromService = Object.assign(
          {
            supplier: 'BBBBBB',
            region: 'BBBBBB',
            description: 'BBBBBB',
            vintage: 'BBBBBB',
            alcoholLevel: 1,
            printRun: 'BBBBBB',
            price: 1,
            physical: 1,
            purchases: 1,
            sales: 1,
            availability: 1,
            pxRevCol: 1,
            lastPurchasePrice: 1,
            lastPurchaseDate: currentDate.format(DATE_TIME_FORMAT),
            dateImport: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastPurchaseDate: currentDate,
            dateImport: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of WineStock', () => {
        const returnedFromService = Object.assign(
          {
            supplier: 'BBBBBB',
            region: 'BBBBBB',
            description: 'BBBBBB',
            vintage: 'BBBBBB',
            alcoholLevel: 1,
            printRun: 'BBBBBB',
            price: 1,
            physical: 1,
            purchases: 1,
            sales: 1,
            availability: 1,
            pxRevCol: 1,
            lastPurchasePrice: 1,
            lastPurchaseDate: currentDate.format(DATE_TIME_FORMAT),
            dateImport: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastPurchaseDate: currentDate,
            dateImport: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a WineStock', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
