import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDemandeOracle } from '../demande-oracle.model';
import { DemandeOracleService } from '../service/demande-oracle.service';

@Component({
  templateUrl: './demande-oracle-delete-dialog.component.html',
})
export class DemandeOracleDeleteDialogComponent {
  demandeOracle?: IDemandeOracle;

  constructor(protected demandeOracleService: DemandeOracleService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.demandeOracleService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
