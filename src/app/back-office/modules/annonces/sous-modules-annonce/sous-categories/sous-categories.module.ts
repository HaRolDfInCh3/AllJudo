import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{SharedModule} from '../../../../../sharedModule/shared/shared.module';
import { SousCategoriesRoutingModule } from './sous-categories-routing.module';
import { EditComponent } from './edit/edit.component';
import { DisplayComponent } from './display/display.component';




@NgModule({
  declarations: [
    DisplayComponent,
    EditComponent
  ],
  imports: [
    CommonModule,SharedModule,
    SousCategoriesRoutingModule
  ]
})
export class SousCategoriesModule { }
