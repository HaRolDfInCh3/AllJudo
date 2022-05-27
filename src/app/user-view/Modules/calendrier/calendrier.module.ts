import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { CalendrierRoutingModule } from './calendrier-routing.module';
import { ListeComponent } from './liste/liste.component';


@NgModule({
  declarations: [
    ListeComponent
  ],
  imports: [
    CommonModule,SharedModule,
    CalendrierRoutingModule
  ]
})
export class CalendrierModule { }
