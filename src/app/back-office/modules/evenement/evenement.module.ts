import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { EvenementRoutingModule } from './evenement-routing.module';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';
import { ResultatComponent } from './resultat/resultat.component';


@NgModule({
  declarations: [
    DisplayComponent,
    EditComponent,
    ResultatComponent
  ],
  imports: [
    CommonModule,SharedModule,
    EvenementRoutingModule
  ]
})
export class EvenementModule { }
