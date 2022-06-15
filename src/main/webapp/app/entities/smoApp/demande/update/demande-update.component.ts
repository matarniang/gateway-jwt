import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDemande, Demande } from '../demande.model';
import { DemandeService } from '../service/demande.service';

@Component({
  selector: 'jhi-demande-update',
  templateUrl: './demande-update.component.html',
})
export class DemandeUpdateComponent implements OnInit {
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

  constructor(protected demandeService: DemandeService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demande }) => {
      this.updateForm(demande);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demande = this.createFromForm();
    if (demande.id !== undefined) {
      this.subscribeToSaveResponse(this.demandeService.update(demande));
    } else {
      this.subscribeToSaveResponse(this.demandeService.create(demande));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemande>>): void {
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

  protected updateForm(demande: IDemande): void {
    this.editForm.patchValue({
      id: demande.id,
      nomApp: demande.nomApp,
      password: demande.password,
      action: demande.action,
      status: demande.status,
      message: demande.message,
      dateDemande: demande.dateDemande,
      dateRetour: demande.dateRetour,
      user: demande.user,
    });
  }

  protected createFromForm(): IDemande {
    return {
      ...new Demande(),
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
