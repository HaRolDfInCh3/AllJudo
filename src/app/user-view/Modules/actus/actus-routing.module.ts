import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { DiaporamaComponent } from './diaporama/diaporama.component';
import { ListeComponent } from './liste/liste.component';

const routes: Routes = [
  {path:"",component:ListeComponent},
  {path:"details/:id",component:DetailsComponent},
  {path:"diaporama/:id",component:DiaporamaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActusRoutingModule { }
