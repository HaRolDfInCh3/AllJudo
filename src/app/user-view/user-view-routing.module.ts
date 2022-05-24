import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path:"",component:MainPageComponent,children:[
    {path:"",loadChildren:()=>import("./Modules/accueil/accueil.module").then(m=>m.AccueilModule)},
    {path:"inscription",loadChildren:()=>import("./Modules/inscription/inscription.module").then(m=>m.InscriptionModule)},
    {path:"actualites-judo",loadChildren:()=>import("./Modules/actus/actus.module").then(m=>m.ActusModule)},
    ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserViewRoutingModule { }
