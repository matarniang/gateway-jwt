import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DemandeWindowsComponent } from './list/demande-windows.component';
import { DemandeWindowsDetailComponent } from './detail/demande-windows-detail.component';
import { DemandeWindowsUpdateComponent } from './update/demande-windows-update.component';
import { DemandeWindowsDeleteDialogComponent } from './delete/demande-windows-delete-dialog.component';
import { DemandeWindowsRoutingModule } from './route/demande-windows-routing.module';

@NgModule({
  imports: [SharedModule, DemandeWindowsRoutingModule],
  declarations: [
    DemandeWindowsComponent,
    DemandeWindowsDetailComponent,
    DemandeWindowsUpdateComponent,
    DemandeWindowsDeleteDialogComponent,
  ],
  entryComponents: [DemandeWindowsDeleteDialogComponent],
})
export class WindowsDemandeWindowsModule {}
