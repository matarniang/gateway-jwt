import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDemandeNessico, DemandeNessico } from '../demande-nessico.model';
import { DemandeNessicoService } from '../service/demande-nessico.service';

@Component({
  selector: 'jhi-demande-nessico-update',
  templateUrl: './demande-nessico-update.component.html',
})
export class DemandeNessicoUpdateComponent implements OnInit {
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

  constructor(
    protected demandeNessicoService: DemandeNessicoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demandeNessico }) => {
      this.updateForm(demandeNessico);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demandeNessico = this.createFromForm();
    if (demandeNessico.id !== undefined) {
      this.subscribeToSaveResponse(this.demandeNessicoService.update(demandeNessico));
    } else {
      this.subscribeToSaveResponse(this.demandeNessicoService.create(demandeNessico));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemandeNessico>>): void {
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

  protected updateForm(demandeNessico: IDemandeNessico): void {
    this.editForm.patchValue({
      id: demandeNessico.id,
      nomApp: demandeNessico.nomApp,
      password: demandeNessico.password,
      action: demandeNessico.action,
      status: demandeNessico.status,
      message: demandeNessico.message,
      dateDemande: demandeNessico.dateDemande,
      dateRetour: demandeNessico.dateRetour,
      user: demandeNessico.user,
    });
  }

  protected createFromForm(): IDemandeNessico {
    return {
      ...new DemandeNessico(),
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
