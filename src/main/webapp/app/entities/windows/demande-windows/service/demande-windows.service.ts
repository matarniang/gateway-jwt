import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDemandeWindows, getDemandeWindowsIdentifier } from '../demande-windows.model';

export type EntityResponseType = HttpResponse<IDemandeWindows>;
export type EntityArrayResponseType = HttpResponse<IDemandeWindows[]>;

@Injectable({ providedIn: 'root' })
export class DemandeWindowsService { 
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/demande-windows','windows');
  protected loginDemande = this.applicationConfigService.getEndpointFor('api/demande-windows-login', 'windows');
  protected deleteDemande = this.applicationConfigService.getEndpointFor('api/demande-windows-delete', 'windows');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(demandeWindows: IDemandeWindows): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(demandeWindows);
    return this.http
      .post<IDemandeWindows>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getDemande(request:string): Observable<EntityResponseType> {
        return this.http
          .post<IDemandeWindows>(this.loginDemande, request, { observe: 'response' })
          .pipe(map((res: EntityResponseType) => res));
      }
    
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
        deleteDemandeid(request:string): Observable<EntityResponseType> {
          return this.http
            .post<IDemandeWindows>(this.deleteDemande, request, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => res));
        }

  update(demandeWindows: IDemandeWindows): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(demandeWindows);
    return this.http
      .put<IDemandeWindows>(`${this.resourceUrl}/${getDemandeWindowsIdentifier(demandeWindows) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(demandeWindows: IDemandeWindows): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(demandeWindows);
    return this.http
      .patch<IDemandeWindows>(`${this.resourceUrl}/${getDemandeWindowsIdentifier(demandeWindows) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDemandeWindows>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDemandeWindows[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDemandeWindowsToCollectionIfMissing(
    demandeWindowsCollection: IDemandeWindows[],
    ...demandeWindowsToCheck: (IDemandeWindows | null | undefined)[]
  ): IDemandeWindows[] {
    const demandeWindows: IDemandeWindows[] = demandeWindowsToCheck.filter(isPresent);
    if (demandeWindows.length > 0) {
      const demandeWindowsCollectionIdentifiers = demandeWindowsCollection.map(
        demandeWindowsItem => getDemandeWindowsIdentifier(demandeWindowsItem)!
      );
      const demandeWindowsToAdd = demandeWindows.filter(demandeWindowsItem => {
        const demandeWindowsIdentifier = getDemandeWindowsIdentifier(demandeWindowsItem);
        if (demandeWindowsIdentifier == null || demandeWindowsCollectionIdentifiers.includes(demandeWindowsIdentifier)) {
          return false;
        }
        demandeWindowsCollectionIdentifiers.push(demandeWindowsIdentifier);
        return true;
      });
      return [...demandeWindowsToAdd, ...demandeWindowsCollection];
    }
    return demandeWindowsCollection;
  }

  protected convertDateFromClient(demandeWindows: IDemandeWindows): IDemandeWindows {
    return Object.assign({}, demandeWindows, {
      dateDemande: demandeWindows.dateDemande?.isValid() ? demandeWindows.dateDemande.format(DATE_FORMAT) : undefined,
      dateRetour: demandeWindows.dateRetour?.isValid() ? demandeWindows.dateRetour.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDemande = res.body.dateDemande ? dayjs(res.body.dateDemande) : undefined;
      res.body.dateRetour = res.body.dateRetour ? dayjs(res.body.dateRetour) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((demandeWindows: IDemandeWindows) => {
        demandeWindows.dateDemande = demandeWindows.dateDemande ? dayjs(demandeWindows.dateDemande) : undefined;
        demandeWindows.dateRetour = demandeWindows.dateRetour ? dayjs(demandeWindows.dateRetour) : undefined;
      });
    }
    return res;
  }
}
