import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';
import { ResultatComponent } from './resultat/resultat.component';

const routes: Routes = [
  {path:"",component:DisplayComponent},
  {path:"edit/:id",component:EditComponent},
  {path:"add/:id",component:ResultatComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvenementRoutingModule { }
