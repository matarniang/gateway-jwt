import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDemandeOracle } from '../demande-oracle.model';
import { DemandeOracleService } from '../service/demande-oracle.service';
import { DemandeOracleDeleteDialogComponent } from '../delete/demande-oracle-delete-dialog.component';

@Component({
  selector: 'jhi-demande-oracle',
  templateUrl: './demande-oracle.component.html',
})
export class DemandeOracleComponent implements OnInit {
  demandeOracles?: IDemandeOracle[];
  isLoading = false;

  constructor(protected demandeOracleService: DemandeOracleService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.demandeOracleService.query().subscribe({
      next: (res: HttpResponse<IDemandeOracle[]>) => {
        this.isLoading = false;
        this.demandeOracles = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDemandeOracle): number {
    return item.id!;
  }

  delete(demandeOracle: IDemandeOracle): void {
    const modalRef = this.modalService.open(DemandeOracleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.demandeOracle = demandeOracle;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
