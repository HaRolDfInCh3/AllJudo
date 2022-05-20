import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';

const routes: Routes = [
  {path:"",component:DisplayComponent,children:[
    {path:"categories",loadChildren:()=>import("./sous-modules-annonce/categories/categories.module").then(m=>m.CategoriesModule)},
    {path:"main",loadChildren:()=>import("./sous-modules-annonce/main/main.module").then(m=>m.MainModule)},
    {path:"",loadChildren:()=>import("./sous-modules-annonce/main/main.module").then(m=>m.MainModule)},

    {path:"sous-categories",loadChildren:()=>import("./sous-modules-annonce/sous-categories/sous-categories.module").then(m=>m.SousCategoriesModule)},
    {path:"parametres",loadChildren:()=>import("./sous-modules-annonce/parametres/parametres.module").then(m=>m.ParametresModule)},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnoncesRoutingModule { }
