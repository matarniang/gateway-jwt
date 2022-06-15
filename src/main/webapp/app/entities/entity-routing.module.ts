import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'demande',
        data: { pageTitle: 'gatewaySmcApp.smoAppDemande.home.title' },
        loadChildren: () => import('./smoApp/demande/demande.module').then(m => m.SmoAppDemandeModule),
      },
      {
        path: 'demande-windows',
        data: { pageTitle: 'gatewaySmcApp.windowsDemandeWindows.home.title' },
        loadChildren: () => import('./windows/demande-windows/demande-windows.module').then(m => m.WindowsDemandeWindowsModule),
      },
      {
        path: 'demande-nessico',
        data: { pageTitle: 'gatewaySmcApp.nessicoDemandeNessico.home.title' },
        loadChildren: () => import('./nessico/demande-nessico/demande-nessico.module').then(m => m.NessicoDemandeNessicoModule),
      },
      {
        path: 'demande-oracle',
        data: { pageTitle: 'gatewaySmcApp.oracleDemandeOracle.home.title' },
        loadChildren: () => import('./oracle/demande-oracle/demande-oracle.module').then(m => m.OracleDemandeOracleModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
