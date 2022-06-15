import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDemandeWindows, DemandeWindows } from '../demande-windows.model';
import { DemandeWindowsService } from '../service/demande-windows.service';

@Component({
  selector: 'jhi-demande-windows-update',
  templateUrl: './demande-windows-update.component.html',
})
export class DemandeWindowsUpdateComponent implements OnInit {
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
    protected demandeWindowsService: DemandeWindowsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demandeWindows }) => {
      this.updateForm(demandeWindows);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demandeWindows = this.createFromForm();
    if (demandeWindows.id !== undefined) {
      this.subscribeToSaveResponse(this.demandeWindowsService.update(demandeWindows));
    } else {
      this.subscribeToSaveResponse(this.demandeWindowsService.create(demandeWindows));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemandeWindows>>): void {
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

  protected updateForm(demandeWindows: IDemandeWindows): void {
    this.editForm.patchValue({
      id: demandeWindows.id,
      nomApp: demandeWindows.nomApp,
      password: demandeWindows.password,
      action: demandeWindows.action,
      status: demandeWindows.status,
      message: demandeWindows.message,
      dateDemande: demandeWindows.dateDemande,
      dateRetour: demandeWindows.dateRetour,
      user: demandeWindows.user,
    });
  }

  protected createFromForm(): IDemandeWindows {
    return {
      ...new DemandeWindows(),
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
