import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DemandeOracleComponent } from '../list/demande-oracle.component';
import { DemandeOracleDetailComponent } from '../detail/demande-oracle-detail.component';
import { DemandeOracleUpdateComponent } from '../update/demande-oracle-update.component';
import { DemandeOracleRoutingResolveService } from './demande-oracle-routing-resolve.service';

const demandeOracleRoute: Routes = [
  {
    path: '',
    component: DemandeOracleComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DemandeOracleDetailComponent,
    resolve: {
      demandeOracle: DemandeOracleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DemandeOracleUpdateComponent,
    resolve: {
      demandeOracle: DemandeOracleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DemandeOracleUpdateComponent,
    resolve: {
      demandeOracle: DemandeOracleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(demandeOracleRoute)],
  exports: [RouterModule],
})
export class DemandeOracleRoutingModule {}
