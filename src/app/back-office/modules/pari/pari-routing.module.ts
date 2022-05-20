import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompositionComponent } from './composition/composition.component';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {path:"",component:DisplayComponent},
  {path:"edit/:id",component:EditComponent},
  {path:"resultat/:id",component:ResultsComponent},
  {path:"composition/:id",component:CompositionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PariRoutingModule { }
