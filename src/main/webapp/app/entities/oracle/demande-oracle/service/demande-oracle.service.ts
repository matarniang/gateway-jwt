import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDemandeOracle, getDemandeOracleIdentifier } from '../demande-oracle.model';

export type EntityResponseType = HttpResponse<IDemandeOracle>;
export type EntityArrayResponseType = HttpResponse<IDemandeOracle[]>;

@Injectable({ providedIn: 'root' })
export class DemandeOracleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/demande-oracles', 'oracle');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(demandeOracle: IDemandeOracle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(demandeOracle);
    return this.http
      .post<IDemandeOracle>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(demandeOracle: IDemandeOracle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(demandeOracle);
    return this.http
      .put<IDemandeOracle>(`${this.resourceUrl}/${getDemandeOracleIdentifier(demandeOracle) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(demandeOracle: IDemandeOracle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(demandeOracle);
    return this.http
      .patch<IDemandeOracle>(`${this.resourceUrl}/${getDemandeOracleIdentifier(demandeOracle) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDemandeOracle>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDemandeOracle[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDemandeOracleToCollectionIfMissing(
    demandeOracleCollection: IDemandeOracle[],
    ...demandeOraclesToCheck: (IDemandeOracle | null | undefined)[]
  ): IDemandeOracle[] {
    const demandeOracles: IDemandeOracle[] = demandeOraclesToCheck.filter(isPresent);
    if (demandeOracles.length > 0) {
      const demandeOracleCollectionIdentifiers = demandeOracleCollection.map(
        demandeOracleItem => getDemandeOracleIdentifier(demandeOracleItem)!
      );
      const demandeOraclesToAdd = demandeOracles.filter(demandeOracleItem => {
        const demandeOracleIdentifier = getDemandeOracleIdentifier(demandeOracleItem);
        if (demandeOracleIdentifier == null || demandeOracleCollectionIdentifiers.includes(demandeOracleIdentifier)) {
          return false;
        }
        demandeOracleCollectionIdentifiers.push(demandeOracleIdentifier);
        return true;
      });
      return [...demandeOraclesToAdd, ...demandeOracleCollection];
    }
    return demandeOracleCollection;
  }

  protected convertDateFromClient(demandeOracle: IDemandeOracle): IDemandeOracle {
    return Object.assign({}, demandeOracle, {
      dateDemande: demandeOracle.dateDemande?.isValid() ? demandeOracle.dateDemande.format(DATE_FORMAT) : undefined,
      dateRetour: demandeOracle.dateRetour?.isValid() ? demandeOracle.dateRetour.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((demandeOracle: IDemandeOracle) => {
        demandeOracle.dateDemande = demandeOracle.dateDemande ? dayjs(demandeOracle.dateDemande) : undefined;
        demandeOracle.dateRetour = demandeOracle.dateRetour ? dayjs(demandeOracle.dateRetour) : undefined;
      });
    }
    return res;
  }
}
