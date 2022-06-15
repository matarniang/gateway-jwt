import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDemandeWindows } from '../demande-windows.model';
import { DemandeWindowsService } from '../service/demande-windows.service';
import { DemandeWindowsDeleteDialogComponent } from '../delete/demande-windows-delete-dialog.component';

@Component({
  selector: 'jhi-demande-windows',
  templateUrl: './demande-windows.component.html',
})
export class DemandeWindowsComponent implements OnInit {
  demandeWindows?: IDemandeWindows[];
  isLoading = false;

  constructor(protected demandeWindowsService: DemandeWindowsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.demandeWindowsService.query().subscribe({
      next: (res: HttpResponse<IDemandeWindows[]>) => {
        this.isLoading = false;
        this.demandeWindows = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDemandeWindows): number {
    return item.id!;
  }

  delete(demandeWindows: IDemandeWindows): void {
    const modalRef = this.modalService.open(DemandeWindowsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.demandeWindows = demandeWindows;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
