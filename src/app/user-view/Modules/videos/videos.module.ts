import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { VideosRoutingModule } from './videos-routing.module';
import { ListeComponent } from './liste/liste.component';
import { DetailsComponent } from './details/details.component';
import { SafePipeModule } from 'safe-pipe';


@NgModule({
  declarations: [
    ListeComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,SharedModule,SafePipeModule,
    VideosRoutingModule
  ]
})
export class VideosModule { }
