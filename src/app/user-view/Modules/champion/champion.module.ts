import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { ChampionRoutingModule } from './champion-routing.module';
import { ListeComponent } from './liste/liste.component';
import { DetailsComponent } from './details/details.component';
import { DemandeAdminComponent } from './demande-admin/demande-admin.component';


@NgModule({
  declarations: [
    ListeComponent,
    DetailsComponent,
    DemandeAdminComponent
  ],
  imports: [
    CommonModule,
    ChampionRoutingModule,SharedModule
  ]
})
export class ChampionModule { }
