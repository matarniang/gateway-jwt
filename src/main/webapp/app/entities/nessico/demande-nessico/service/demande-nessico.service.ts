import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDemandeNessico, getDemandeNessicoIdentifier } from '../demande-nessico.model';

export type EntityResponseType = HttpResponse<IDemandeNessico>;
export type EntityArrayResponseType = HttpResponse<IDemandeNessico[]>;

@Injectable({ providedIn: 'root' })
export class DemandeNessicoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/demande-nessicos', 'nessico');
  protected loginDemande = this.applicationConfigService.getEndpointFor('api/demande-nessicos-login', 'nessico');
  protected deleteDemande = this.applicationConfigService.getEndpointFor('api/demande-nessicos-delete', 'nessico');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(demandeNessico: IDemandeNessico): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(demandeNessico);
    return this.http
      .post<IDemandeNessico>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getDemande(request:string): Observable<EntityResponseType> {
      return this.http
        .post<IDemandeNessico>(this.loginDemande, request, { observe: 'response' })
        .pipe(map((res: EntityResponseType) => res));
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      deleteDemandeid(request:string): Observable<EntityResponseType> {
        return this.http
          .post<IDemandeNessico>(this.deleteDemande, request, { observe: 'response' })
          .pipe(map((res: EntityResponseType) => res));
      }

  update(demandeNessico: IDemandeNessico): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(demandeNessico);
    return this.http
      .put<IDemandeNessico>(`${this.resourceUrl}/${getDemandeNessicoIdentifier(demandeNessico) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(demandeNessico: IDemandeNessico): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(demandeNessico);
    return this.http
      .patch<IDemandeNessico>(`${this.resourceUrl}/${getDemandeNessicoIdentifier(demandeNessico) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDemandeNessico>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDemandeNessico[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDemandeNessicoToCollectionIfMissing(
    demandeNessicoCollection: IDemandeNessico[],
    ...demandeNessicosToCheck: (IDemandeNessico | null | undefined)[]
  ): IDemandeNessico[] {
    const demandeNessicos: IDemandeNessico[] = demandeNessicosToCheck.filter(isPresent);
    if (demandeNessicos.length > 0) {
      const demandeNessicoCollectionIdentifiers = demandeNessicoCollection.map(
        demandeNessicoItem => getDemandeNessicoIdentifier(demandeNessicoItem)!
      );
      const demandeNessicosToAdd = demandeNessicos.filter(demandeNessicoItem => {
        const demandeNessicoIdentifier = getDemandeNessicoIdentifier(demandeNessicoItem);
        if (demandeNessicoIdentifier == null || demandeNessicoCollectionIdentifiers.includes(demandeNessicoIdentifier)) {
          return false;
        }
        demandeNessicoCollectionIdentifiers.push(demandeNessicoIdentifier);
        return true;
      });
      return [...demandeNessicosToAdd, ...demandeNessicoCollection];
    }
    return demandeNessicoCollection;
  }

  protected convertDateFromClient(demandeNessico: IDemandeNessico): IDemandeNessico {
    return Object.assign({}, demandeNessico, {
      dateDemande: demandeNessico.dateDemande?.isValid() ? demandeNessico.dateDemande.format(DATE_FORMAT) : undefined,
      dateRetour: demandeNessico.dateRetour?.isValid() ? demandeNessico.dateRetour.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((demandeNessico: IDemandeNessico) => {
        demandeNessico.dateDemande = demandeNessico.dateDemande ? dayjs(demandeNessico.dateDemande) : undefined;
        demandeNessico.dateRetour = demandeNessico.dateRetour ? dayjs(demandeNessico.dateRetour) : undefined;
      });
    }
    return res;
  }
}
