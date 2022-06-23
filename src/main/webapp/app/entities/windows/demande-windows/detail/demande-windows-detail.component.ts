import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDemandeWindows } from '../demande-windows.model';

@Component({
  selector: 'jhi-demande-windows-detail',
  templateUrl: './demande-windows-detail.component.html',
})
export class DemandeWindowsDetailComponent implements OnInit {
  demandeWindows: IDemandeWindows | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demandeWindows }) => {
      this.demandeWindows = demandeWindows;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
