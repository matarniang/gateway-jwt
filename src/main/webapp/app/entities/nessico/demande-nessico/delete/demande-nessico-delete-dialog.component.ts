import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDemandeNessico } from '../demande-nessico.model';
import { DemandeNessicoService } from '../service/demande-nessico.service';

@Component({
  templateUrl: './demande-nessico-delete-dialog.component.html',
})
export class DemandeNessicoDeleteDialogComponent {
  demandeNessico?: IDemandeNessico;

  constructor(protected demandeNessicoService: DemandeNessicoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.demandeNessicoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
