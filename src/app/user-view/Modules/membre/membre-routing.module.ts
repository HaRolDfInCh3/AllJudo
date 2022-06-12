import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ModifierChampionComponent } from './modifier-champion/modifier-champion.component';

const routes: Routes = [
  {path:"details",component:DetailsComponent},
  {path:"modifierchampion/:id",component:ModifierChampionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembreRoutingModule { }
