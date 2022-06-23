import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDemandeNessico } from '../demande-nessico.model';
import { DemandeNessicoService } from '../service/demande-nessico.service';
import { DemandeNessicoDeleteDialogComponent } from '../delete/demande-nessico-delete-dialog.component';

@Component({
  selector: 'jhi-demande-nessico',
  templateUrl: './demande-nessico.component.html',
})
export class DemandeNessicoComponent implements OnInit {
  demandeNessicos?: IDemandeNessico[];
  isLoading = false;

  constructor(protected demandeNessicoService: DemandeNessicoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.demandeNessicoService.query().subscribe({
      next: (res: HttpResponse<IDemandeNessico[]>) => {
        this.isLoading = false;
        this.demandeNessicos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDemandeNessico): number {
    return item.id!;
  }

  delete(demandeNessico: IDemandeNessico): void {
    const modalRef = this.modalService.open(DemandeNessicoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.demandeNessico = demandeNessico;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
