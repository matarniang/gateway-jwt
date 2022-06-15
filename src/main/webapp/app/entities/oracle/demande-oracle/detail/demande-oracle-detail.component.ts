import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDemandeOracle } from '../demande-oracle.model';

@Component({
  selector: 'jhi-demande-oracle-detail',
  templateUrl: './demande-oracle-detail.component.html',
})
export class DemandeOracleDetailComponent implements OnInit {
  demandeOracle: IDemandeOracle | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demandeOracle }) => {
      this.demandeOracle = demandeOracle;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
