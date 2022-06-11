import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterTournoiComponent } from './ajouter-tournoi/ajouter-tournoi.component';
import { ListeComponent } from './liste/liste.component';

const routes: Routes = [
  {path:"",component:ListeComponent},
  {path:"ajouter-tournoi",component:AjouterTournoiComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendrierRoutingModule { }
