import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDemandeWindows, DemandeWindows } from '../demande-windows.model';

import { DemandeWindowsService } from './demande-windows.service';

describe('DemandeWindows Service', () => {
  let service: DemandeWindowsService;
  let httpMock: HttpTestingController;
  let elemDefault: IDemandeWindows;
  let expectedResult: IDemandeWindows | IDemandeWindows[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DemandeWindowsService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      nomApp: 'AAAAAAA',
      password: 'AAAAAAA',
      action: 'AAAAAAA',
      status: 'AAAAAAA',
      message: 'AAAAAAA',
      dateDemande: currentDate,
      dateRetour: currentDate,
      user: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          dateDemande: currentDate.format(DATE_FORMAT),
          dateRetour: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a DemandeWindows', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          dateDemande: currentDate.format(DATE_FORMAT),
          dateRetour: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateDemande: currentDate,
          dateRetour: currentDate,
        },
        returnedFromService
      );

      service.create(new DemandeWindows()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DemandeWindows', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nomApp: 'BBBBBB',
          password: 'BBBBBB',
          action: 'BBBBBB',
          status: 'BBBBBB',
          message: 'BBBBBB',
          dateDemande: currentDate.format(DATE_FORMAT),
          dateRetour: currentDate.format(DATE_FORMAT),
          user: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateDemande: currentDate,
          dateRetour: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DemandeWindows', () => {
      const patchObject = Object.assign(
        {
          password: 'BBBBBB',
          action: 'BBBBBB',
          message: 'BBBBBB',
          dateDemande: currentDate.format(DATE_FORMAT),
          dateRetour: currentDate.format(DATE_FORMAT),
        },
        new DemandeWindows()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          dateDemande: currentDate,
          dateRetour: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DemandeWindows', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nomApp: 'BBBBBB',
          password: 'BBBBBB',
          action: 'BBBBBB',
          status: 'BBBBBB',
          message: 'BBBBBB',
          dateDemande: currentDate.format(DATE_FORMAT),
          dateRetour: currentDate.format(DATE_FORMAT),
          user: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateDemande: currentDate,
          dateRetour: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a DemandeWindows', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDemandeWindowsToCollectionIfMissing', () => {
      it('should add a DemandeWindows to an empty array', () => {
        const demandeWindows: IDemandeWindows = { id: 123 };
        expectedResult = service.addDemandeWindowsToCollectionIfMissing([], demandeWindows);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(demandeWindows);
      });

      it('should not add a DemandeWindows to an array that contains it', () => {
        const demandeWindows: IDemandeWindows = { id: 123 };
        const demandeWindowsCollection: IDemandeWindows[] = [
          {
            ...demandeWindows,
          },
          { id: 456 },
        ];
        expectedResult = service.addDemandeWindowsToCollectionIfMissing(demandeWindowsCollection, demandeWindows);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DemandeWindows to an array that doesn't contain it", () => {
        const demandeWindows: IDemandeWindows = { id: 123 };
        const demandeWindowsCollection: IDemandeWindows[] = [{ id: 456 }];
        expectedResult = service.addDemandeWindowsToCollectionIfMissing(demandeWindowsCollection, demandeWindows);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(demandeWindows);
      });

      it('should add only unique DemandeWindows to an array', () => {
        const demandeWindowsArray: IDemandeWindows[] = [{ id: 123 }, { id: 456 }, { id: 95676 }];
        const demandeWindowsCollection: IDemandeWindows[] = [{ id: 123 }];
        expectedResult = service.addDemandeWindowsToCollectionIfMissing(demandeWindowsCollection, ...demandeWindowsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const demandeWindows: IDemandeWindows = { id: 123 };
        const demandeWindows2: IDemandeWindows = { id: 456 };
        expectedResult = service.addDemandeWindowsToCollectionIfMissing([], demandeWindows, demandeWindows2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(demandeWindows);
        expect(expectedResult).toContain(demandeWindows2);
      });

      it('should accept null and undefined values', () => {
        const demandeWindows: IDemandeWindows = { id: 123 };
        expectedResult = service.addDemandeWindowsToCollectionIfMissing([], null, demandeWindows, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(demandeWindows);
      });

      it('should return initial array if no DemandeWindows is added', () => {
        const demandeWindowsCollection: IDemandeWindows[] = [{ id: 123 }];
        expectedResult = service.addDemandeWindowsToCollectionIfMissing(demandeWindowsCollection, undefined, null);
        expect(expectedResult).toEqual(demandeWindowsCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
