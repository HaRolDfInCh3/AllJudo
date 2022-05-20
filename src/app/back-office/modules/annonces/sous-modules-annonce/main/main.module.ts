import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{SharedModule} from '../../../../../sharedModule/shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    DisplayComponent,
    EditComponent
  ],
  imports: [
    CommonModule,SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
