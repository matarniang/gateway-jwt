import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDemandeWindows, DemandeWindows } from '../demande-windows.model';
import { DemandeWindowsService } from '../service/demande-windows.service';

import { DemandeWindowsRoutingResolveService } from './demande-windows-routing-resolve.service';

describe('DemandeWindows routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: DemandeWindowsRoutingResolveService;
  let service: DemandeWindowsService;
  let resultDemandeWindows: IDemandeWindows | undefined;

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
    routingResolveService = TestBed.inject(DemandeWindowsRoutingResolveService);
    service = TestBed.inject(DemandeWindowsService);
    resultDemandeWindows = undefined;
  });

  describe('resolve', () => {
    it('should return IDemandeWindows returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDemandeWindows = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDemandeWindows).toEqual({ id: 123 });
    });

    it('should return new IDemandeWindows if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDemandeWindows = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDemandeWindows).toEqual(new DemandeWindows());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as DemandeWindows })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDemandeWindows = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDemandeWindows).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
