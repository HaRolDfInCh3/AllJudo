import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:"",loadChildren:()=>import("./user-view/user-view.module").then(m=>m.UserViewModule)},
  {path:"view",loadChildren:()=>import("./user-view/user-view.module").then(m=>m.UserViewModule)},
  {path:"admin",loadChildren:()=>import("./back-office/back-office.module").then(m=>m.BackOfficeModule)},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
