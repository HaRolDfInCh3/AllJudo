import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { CalendrierRoutingModule } from './calendrier-routing.module';
import { ListeComponent } from './liste/liste.component';
import { AjouterTournoiComponent } from './ajouter-tournoi/ajouter-tournoi.component';


@NgModule({
  declarations: [
    ListeComponent,
    AjouterTournoiComponent
  ],
  imports: [
    CommonModule,SharedModule,
    CalendrierRoutingModule
  ]
})
export class CalendrierModule { }
