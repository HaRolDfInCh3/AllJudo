import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { ResultatsAdminRoutingModule } from './resultats-admin-routing.module';
import { DisplayComponent } from './display/display.component';


@NgModule({
  declarations: [
    DisplayComponent
  ],
  imports: [
    CommonModule,SharedModule,
    ResultatsAdminRoutingModule
  ]
})
export class ResultatsAdminModule { }
