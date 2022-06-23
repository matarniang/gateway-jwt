import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDemandeOracle, DemandeOracle } from '../demande-oracle.model';
import { DemandeOracleService } from '../service/demande-oracle.service';

@Injectable({ providedIn: 'root' })
export class DemandeOracleRoutingResolveService implements Resolve<IDemandeOracle> {
  constructor(protected service: DemandeOracleService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDemandeOracle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((demandeOracle: HttpResponse<DemandeOracle>) => {
          if (demandeOracle.body) {
            return of(demandeOracle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DemandeOracle());
  }
}
