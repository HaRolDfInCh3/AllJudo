import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{SharedModule} from '../../../sharedModule/shared/shared.module';
import { ChampionRoutingModule } from './champion-routing.module';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    DisplayComponent,
    EditComponent
  ],
  imports: [
    CommonModule,SharedModule,
    ChampionRoutingModule
  ]
})
export class ChampionModule { }
