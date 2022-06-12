import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { MembreRoutingModule } from './membre-routing.module';
import { DetailsComponent } from './details/details.component';
import { ModifierChampionComponent } from './modifier-champion/modifier-champion.component';


@NgModule({
  declarations: [
    DetailsComponent,
    ModifierChampionComponent
  ],
  imports: [
    CommonModule,SharedModule,
    MembreRoutingModule
  ]
})
export class MembreModule { }
