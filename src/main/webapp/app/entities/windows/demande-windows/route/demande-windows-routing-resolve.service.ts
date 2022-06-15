import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDemandeWindows, DemandeWindows } from '../demande-windows.model';
import { DemandeWindowsService } from '../service/demande-windows.service';

@Injectable({ providedIn: 'root' })
export class DemandeWindowsRoutingResolveService implements Resolve<IDemandeWindows> {
  constructor(protected service: DemandeWindowsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDemandeWindows> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((demandeWindows: HttpResponse<DemandeWindows>) => {
          if (demandeWindows.body) {
            return of(demandeWindows.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DemandeWindows());
  }
}
