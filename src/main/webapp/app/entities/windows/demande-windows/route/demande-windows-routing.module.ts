import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DemandeWindowsComponent } from '../list/demande-windows.component';
import { DemandeWindowsDetailComponent } from '../detail/demande-windows-detail.component';
import { DemandeWindowsUpdateComponent } from '../update/demande-windows-update.component';
import { DemandeWindowsRoutingResolveService } from './demande-windows-routing-resolve.service';

const demandeWindowsRoute: Routes = [
  {
    path: '',
    component: DemandeWindowsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DemandeWindowsDetailComponent,
    resolve: {
      demandeWindows: DemandeWindowsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DemandeWindowsUpdateComponent,
    resolve: {
      demandeWindows: DemandeWindowsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DemandeWindowsUpdateComponent,
    resolve: {
      demandeWindows: DemandeWindowsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(demandeWindowsRoute)],
  exports: [RouterModule],
})
export class DemandeWindowsRoutingModule {}
