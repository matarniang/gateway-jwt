import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DemandeOracleComponent } from './list/demande-oracle.component';
import { DemandeOracleDetailComponent } from './detail/demande-oracle-detail.component';
import { DemandeOracleUpdateComponent } from './update/demande-oracle-update.component';
import { DemandeOracleDeleteDialogComponent } from './delete/demande-oracle-delete-dialog.component';
import { DemandeOracleRoutingModule } from './route/demande-oracle-routing.module';

@NgModule({
  imports: [SharedModule, DemandeOracleRoutingModule],
  declarations: [DemandeOracleComponent, DemandeOracleDetailComponent, DemandeOracleUpdateComponent, DemandeOracleDeleteDialogComponent],
  entryComponents: [DemandeOracleDeleteDialogComponent],
})
export class OracleDemandeOracleModule {}
