import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDemandeNessico, DemandeNessico } from '../demande-nessico.model';

import { DemandeNessicoService } from './demande-nessico.service';

describe('DemandeNessico Service', () => {
  let service: DemandeNessicoService;
  let httpMock: HttpTestingController;
  let elemDefault: IDemandeNessico;
  let expectedResult: IDemandeNessico | IDemandeNessico[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DemandeNessicoService);
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

    it('should create a DemandeNessico', () => {
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

      service.create(new DemandeNessico()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DemandeNessico', () => {
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

    it('should partial update a DemandeNessico', () => {
      const patchObject = Object.assign(
        {
          dateRetour: currentDate.format(DATE_FORMAT),
          user: 'BBBBBB',
        },
        new DemandeNessico()
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

    it('should return a list of DemandeNessico', () => {
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

    it('should delete a DemandeNessico', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDemandeNessicoToCollectionIfMissing', () => {
      it('should add a DemandeNessico to an empty array', () => {
        const demandeNessico: IDemandeNessico = { id: 123 };
        expectedResult = service.addDemandeNessicoToCollectionIfMissing([], demandeNessico);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(demandeNessico);
      });

      it('should not add a DemandeNessico to an array that contains it', () => {
        const demandeNessico: IDemandeNessico = { id: 123 };
        const demandeNessicoCollection: IDemandeNessico[] = [
          {
            ...demandeNessico,
          },
          { id: 456 },
        ];
        expectedResult = service.addDemandeNessicoToCollectionIfMissing(demandeNessicoCollection, demandeNessico);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DemandeNessico to an array that doesn't contain it", () => {
        const demandeNessico: IDemandeNessico = { id: 123 };
        const demandeNessicoCollection: IDemandeNessico[] = [{ id: 456 }];
        expectedResult = service.addDemandeNessicoToCollectionIfMissing(demandeNessicoCollection, demandeNessico);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(demandeNessico);
      });

      it('should add only unique DemandeNessico to an array', () => {
        const demandeNessicoArray: IDemandeNessico[] = [{ id: 123 }, { id: 456 }, { id: 15325 }];
        const demandeNessicoCollection: IDemandeNessico[] = [{ id: 123 }];
        expectedResult = service.addDemandeNessicoToCollectionIfMissing(demandeNessicoCollection, ...demandeNessicoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const demandeNessico: IDemandeNessico = { id: 123 };
        const demandeNessico2: IDemandeNessico = { id: 456 };
        expectedResult = service.addDemandeNessicoToCollectionIfMissing([], demandeNessico, demandeNessico2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(demandeNessico);
        expect(expectedResult).toContain(demandeNessico2);
      });

      it('should accept null and undefined values', () => {
        const demandeNessico: IDemandeNessico = { id: 123 };
        expectedResult = service.addDemandeNessicoToCollectionIfMissing([], null, demandeNessico, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(demandeNessico);
      });

      it('should return initial array if no DemandeNessico is added', () => {
        const demandeNessicoCollection: IDemandeNessico[] = [{ id: 123 }];
        expectedResult = service.addDemandeNessicoToCollectionIfMissing(demandeNessicoCollection, undefined, null);
        expect(expectedResult).toEqual(demandeNessicoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
