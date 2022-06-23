import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'demande-oracle',
        data: { pageTitle: 'gatewayApp.oracleDemandeOracle.home.title' },
        loadChildren: () => import('./oracle/demande-oracle/demande-oracle.module').then(m => m.OracleDemandeOracleModule),
      },
      {
        path: 'demande-windows',
        data: { pageTitle: 'gatewayApp.windowsDemandeWindows.home.title' },
        loadChildren: () => import('./windows/demande-windows/demande-windows.module').then(m => m.WindowsDemandeWindowsModule),
      },
      {
        path: 'demande-nessico',
        data: { pageTitle: 'gatewayApp.nessicoDemandeNessico.home.title' },
        loadChildren: () => import('./nessico/demande-nessico/demande-nessico.module').then(m => m.NessicoDemandeNessicoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
