import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDemandeOracle, DemandeOracle } from '../demande-oracle.model';

import { DemandeOracleService } from './demande-oracle.service';

describe('DemandeOracle Service', () => {
  let service: DemandeOracleService;
  let httpMock: HttpTestingController;
  let elemDefault: IDemandeOracle;
  let expectedResult: IDemandeOracle | IDemandeOracle[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DemandeOracleService);
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

    it('should create a DemandeOracle', () => {
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

      service.create(new DemandeOracle()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DemandeOracle', () => {
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

    it('should partial update a DemandeOracle', () => {
      const patchObject = Object.assign(
        {
          nomApp: 'BBBBBB',
          password: 'BBBBBB',
          action: 'BBBBBB',
          message: 'BBBBBB',
          dateDemande: currentDate.format(DATE_FORMAT),
          dateRetour: currentDate.format(DATE_FORMAT),
          user: 'BBBBBB',
        },
        new DemandeOracle()
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

    it('should return a list of DemandeOracle', () => {
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

    it('should delete a DemandeOracle', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDemandeOracleToCollectionIfMissing', () => {
      it('should add a DemandeOracle to an empty array', () => {
        const demandeOracle: IDemandeOracle = { id: 123 };
        expectedResult = service.addDemandeOracleToCollectionIfMissing([], demandeOracle);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(demandeOracle);
      });

      it('should not add a DemandeOracle to an array that contains it', () => {
        const demandeOracle: IDemandeOracle = { id: 123 };
        const demandeOracleCollection: IDemandeOracle[] = [
          {
            ...demandeOracle,
          },
          { id: 456 },
        ];
        expectedResult = service.addDemandeOracleToCollectionIfMissing(demandeOracleCollection, demandeOracle);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DemandeOracle to an array that doesn't contain it", () => {
        const demandeOracle: IDemandeOracle = { id: 123 };
        const demandeOracleCollection: IDemandeOracle[] = [{ id: 456 }];
        expectedResult = service.addDemandeOracleToCollectionIfMissing(demandeOracleCollection, demandeOracle);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(demandeOracle);
      });

      it('should add only unique DemandeOracle to an array', () => {
        const demandeOracleArray: IDemandeOracle[] = [{ id: 123 }, { id: 456 }, { id: 66112 }];
        const demandeOracleCollection: IDemandeOracle[] = [{ id: 123 }];
        expectedResult = service.addDemandeOracleToCollectionIfMissing(demandeOracleCollection, ...demandeOracleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const demandeOracle: IDemandeOracle = { id: 123 };
        const demandeOracle2: IDemandeOracle = { id: 456 };
        expectedResult = service.addDemandeOracleToCollectionIfMissing([], demandeOracle, demandeOracle2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(demandeOracle);
        expect(expectedResult).toContain(demandeOracle2);
      });

      it('should accept null and undefined values', () => {
        const demandeOracle: IDemandeOracle = { id: 123 };
        expectedResult = service.addDemandeOracleToCollectionIfMissing([], null, demandeOracle, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(demandeOracle);
      });

      it('should return initial array if no DemandeOracle is added', () => {
        const demandeOracleCollection: IDemandeOracle[] = [{ id: 123 }];
        expectedResult = service.addDemandeOracleToCollectionIfMissing(demandeOracleCollection, undefined, null);
        expect(expectedResult).toEqual(demandeOracleCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
