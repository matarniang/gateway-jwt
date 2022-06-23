import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DemandeNessicoComponent } from './list/demande-nessico.component';
import { DemandeNessicoDetailComponent } from './detail/demande-nessico-detail.component';
import { DemandeNessicoUpdateComponent } from './update/demande-nessico-update.component';
import { DemandeNessicoDeleteDialogComponent } from './delete/demande-nessico-delete-dialog.component';
import { DemandeNessicoRoutingModule } from './route/demande-nessico-routing.module';

@NgModule({
  imports: [SharedModule, DemandeNessicoRoutingModule],
  declarations: [
    DemandeNessicoComponent,
    DemandeNessicoDetailComponent,
    DemandeNessicoUpdateComponent,
    DemandeNessicoDeleteDialogComponent,
  ],
  entryComponents: [DemandeNessicoDeleteDialogComponent],
})
export class NessicoDemandeNessicoModule {}
