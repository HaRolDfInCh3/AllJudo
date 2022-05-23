import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { AccueilRoutingModule } from './accueil-routing.module';
import { ListeComponent } from './liste/liste.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    ListeComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,SharedModule ,
    AccueilRoutingModule
  ]
})
export class AccueilModule { }
