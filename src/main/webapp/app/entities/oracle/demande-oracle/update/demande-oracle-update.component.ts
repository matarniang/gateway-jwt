import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDemandeOracle, DemandeOracle } from '../demande-oracle.model';
import { DemandeOracleService } from '../service/demande-oracle.service';

@Component({
  selector: 'jhi-demande-oracle-update',
  templateUrl: './demande-oracle-update.component.html',
})
export class DemandeOracleUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nomApp: [],
    password: [],
    action: [],
    status: [],
    message: [],
    dateDemande: [],
    dateRetour: [],
    user: [],
  });

  constructor(protected demandeOracleService: DemandeOracleService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demandeOracle }) => {
      this.updateForm(demandeOracle);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demandeOracle = this.createFromForm();
    if (demandeOracle.id !== undefined) {
      this.subscribeToSaveResponse(this.demandeOracleService.update(demandeOracle));
    } else {
      this.subscribeToSaveResponse(this.demandeOracleService.create(demandeOracle));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemandeOracle>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(demandeOracle: IDemandeOracle): void {
    this.editForm.patchValue({
      id: demandeOracle.id,
      nomApp: demandeOracle.nomApp,
      password: demandeOracle.password,
      action: demandeOracle.action,
      status: demandeOracle.status,
      message: demandeOracle.message,
      dateDemande: demandeOracle.dateDemande,
      dateRetour: demandeOracle.dateRetour,
      user: demandeOracle.user,
    });
  }

  protected createFromForm(): IDemandeOracle {
    return {
      ...new DemandeOracle(),
      id: this.editForm.get(['id'])!.value,
      nomApp: this.editForm.get(['nomApp'])!.value,
      password: this.editForm.get(['password'])!.value,
      action: this.editForm.get(['action'])!.value,
      status: this.editForm.get(['status'])!.value,
      message: this.editForm.get(['message'])!.value,
      dateDemande: this.editForm.get(['dateDemande'])!.value,
      dateRetour: this.editForm.get(['dateRetour'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }
}
