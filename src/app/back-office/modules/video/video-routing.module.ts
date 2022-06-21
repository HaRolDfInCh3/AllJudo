import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddYoutubeVideoComponent } from './add-youtube-video/add-youtube-video.component';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path:"",component:DisplayComponent},
  {path:"edit/:id",component:EditComponent},
  {path:"add/:id",component:AddYoutubeVideoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
