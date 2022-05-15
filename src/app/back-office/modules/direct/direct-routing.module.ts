import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';
import { LiveComponent } from './live/live.component';

const routes: Routes = [
  {path:"",component:DisplayComponent},
  {path:"edit/:id",component:EditComponent},
  {path:"live/:id",component:LiveComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectRoutingModule { }
