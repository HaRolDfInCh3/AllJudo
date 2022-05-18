import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { PariRoutingModule } from './pari-routing.module';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';
import { ResultsComponent } from './results/results.component';
import { CompositionComponent } from './composition/composition.component';


@NgModule({
  declarations: [
    DisplayComponent,
    EditComponent,
    ResultsComponent,
    CompositionComponent
  ],
  imports: [
    CommonModule,SharedModule,
    PariRoutingModule
  ]
})
export class PariModule { }
