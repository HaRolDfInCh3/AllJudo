import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { DisplayComponent } from './display/display.component';
import{SharedModule} from '../../../sharedModule/shared/shared.module';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    DisplayComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule
  ]
})
export class NewsModule { }
