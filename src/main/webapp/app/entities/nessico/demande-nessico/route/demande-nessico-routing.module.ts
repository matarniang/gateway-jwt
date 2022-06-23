import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DemandeNessicoComponent } from '../list/demande-nessico.component';
import { DemandeNessicoDetailComponent } from '../detail/demande-nessico-detail.component';
import { DemandeNessicoUpdateComponent } from '../update/demande-nessico-update.component';
import { DemandeNessicoRoutingResolveService } from './demande-nessico-routing-resolve.service';

const demandeNessicoRoute: Routes = [
  {
    path: '',
    component: DemandeNessicoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DemandeNessicoDetailComponent,
    resolve: {
      demandeNessico: DemandeNessicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DemandeNessicoUpdateComponent,
    resolve: {
      demandeNessico: DemandeNessicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DemandeNessicoUpdateComponent,
    resolve: {
      demandeNessico: DemandeNessicoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(demandeNessicoRoute)],
  exports: [RouterModule],
})
export class DemandeNessicoRoutingModule {}
