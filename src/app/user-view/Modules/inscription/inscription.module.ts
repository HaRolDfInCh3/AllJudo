import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { InscriptionRoutingModule } from './inscription-routing.module';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  declarations: [
    FormulaireComponent
  ],
  imports: [
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7261110840191217',
      adSlot: 7957483785,
    }),
    CommonModule,SharedModule,
    InscriptionRoutingModule
  ]
})
export class InscriptionModule { }
