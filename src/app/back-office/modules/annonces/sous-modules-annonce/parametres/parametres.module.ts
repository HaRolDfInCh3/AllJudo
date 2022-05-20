import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{SharedModule} from '../../../../../sharedModule/shared/shared.module';
import { ParametresRoutingModule } from './parametres-routing.module';
import { EditComponent } from './edit/edit.component';
import { DisplayComponent } from './display/display.component';


@NgModule({
  declarations: [
    EditComponent,
    DisplayComponent
  ],
  imports: [
    CommonModule,SharedModule,
    ParametresRoutingModule
  ]
})
export class ParametresModule { }
