import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { ActusRoutingModule } from './actus-routing.module';
import { ListeComponent } from './liste/liste.component';
import { DetailsComponent } from './details/details.component';
import { DiaporamaComponent } from './diaporama/diaporama.component';


@NgModule({
  declarations: [
    ListeComponent,
    DetailsComponent,
    DiaporamaComponent
  ],
  imports: [
    CommonModule,SharedModule,
    ActusRoutingModule
  ]
})
export class ActusModule { }
