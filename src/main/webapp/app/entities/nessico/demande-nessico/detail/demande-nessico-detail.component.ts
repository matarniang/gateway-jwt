import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDemandeNessico } from '../demande-nessico.model';

@Component({
  selector: 'jhi-demande-nessico-detail',
  templateUrl: './demande-nessico-detail.component.html',
})
export class DemandeNessicoDetailComponent implements OnInit {
  demandeNessico: IDemandeNessico | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demandeNessico }) => {
      this.demandeNessico = demandeNessico;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
