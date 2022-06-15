import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDemande } from '../demande.model';
import { DemandeService } from '../service/demande.service';
import { DemandeDeleteDialogComponent } from '../delete/demande-delete-dialog.component';

@Component({
  selector: 'jhi-demande',
  templateUrl: './demande.component.html',
})
export class DemandeComponent implements OnInit {
  demandes?: IDemande[];
  isLoading = false;

  constructor(protected demandeService: DemandeService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.demandeService.query().subscribe({
      next: (res: HttpResponse<IDemande[]>) => {
        this.isLoading = false;
        this.demandes = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDemande): number {
    return item.id!;
  }

  delete(demande: IDemande): void {
    const modalRef = this.modalService.open(DemandeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.demande = demande;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
