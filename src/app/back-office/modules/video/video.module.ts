import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { VideoRoutingModule } from './video-routing.module';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';
import { AddYoutubeVideoComponent } from './add-youtube-video/add-youtube-video.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DisplayComponent,
    EditComponent,
    AddYoutubeVideoComponent
  ],
  imports: [
    CommonModule,SharedModule,FormsModule,ReactiveFormsModule,
    VideoRoutingModule
  ]
})
export class VideoModule { }
