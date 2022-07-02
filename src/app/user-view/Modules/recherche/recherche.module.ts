import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { RechercheRoutingModule } from './recherche-routing.module';
import { DisplayComponent } from './display/display.component';


@NgModule({
  declarations: [
    DisplayComponent
  ],
  imports: [
    CommonModule,SharedModule,
    RechercheRoutingModule
  ]
})
export class RechercheModule { }
