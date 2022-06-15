import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDemandeWindows } from '../demande-windows.model';
import { DemandeWindowsService } from '../service/demande-windows.service';

@Component({
  templateUrl: './demande-windows-delete-dialog.component.html',
})
export class DemandeWindowsDeleteDialogComponent {
  demandeWindows?: IDemandeWindows;

  constructor(protected demandeWindowsService: DemandeWindowsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.demandeWindowsService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
