import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDemandeOracle, DemandeOracle } from '../demande-oracle.model';
import { DemandeOracleService } from '../service/demande-oracle.service';

import { DemandeOracleRoutingResolveService } from './demande-oracle-routing-resolve.service';

describe('DemandeOracle routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: DemandeOracleRoutingResolveService;
  let service: DemandeOracleService;
  let resultDemandeOracle: IDemandeOracle | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(DemandeOracleRoutingResolveService);
    service = TestBed.inject(DemandeOracleService);
    resultDemandeOracle = undefined;
  });

  describe('resolve', () => {
    it('should return IDemandeOracle returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDemandeOracle = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDemandeOracle).toEqual({ id: 123 });
    });

    it('should return new IDemandeOracle if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDemandeOracle = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDemandeOracle).toEqual(new DemandeOracle());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as DemandeOracle })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDemandeOracle = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDemandeOracle).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
