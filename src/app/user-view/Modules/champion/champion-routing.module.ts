import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandeAdminComponent } from './demande-admin/demande-admin.component';
import { DetailsComponent } from './details/details.component';
import { ListeComponent } from './liste/liste.component';

const routes: Routes = [
  {path:"",component:ListeComponent},
  {path:"details/:id",component:DetailsComponent},
  {path:"demandeAdmin/:id",component:DemandeAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChampionRoutingModule { }
