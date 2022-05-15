import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { DirectRoutingModule } from './direct-routing.module';
import { DisplayComponent } from './display/display.component';
import { LiveComponent } from './live/live.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    DisplayComponent,
    LiveComponent,
    EditComponent
  ],
  imports: [
    CommonModule,SharedModule,
    DirectRoutingModule
  ]
})
export class DirectModule { }
