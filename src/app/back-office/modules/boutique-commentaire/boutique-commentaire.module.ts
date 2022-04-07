import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{SharedModule} from '../../../sharedModule/shared/shared.module';
import { BoutiqueCommentaireRoutingModule } from './boutique-commentaire-routing.module';
import { DisplayComponent } from './display/display.component';


@NgModule({
  declarations: [
    DisplayComponent
  ],
  imports: [
    CommonModule,SharedModule,
    BoutiqueCommentaireRoutingModule
  ]
})
export class BoutiqueCommentaireModule { }
