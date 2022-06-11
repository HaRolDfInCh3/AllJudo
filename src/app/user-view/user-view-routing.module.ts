import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path:"",component:MainPageComponent,children:[
    {path:"",loadChildren:()=>import("./Modules/accueil/accueil.module").then(m=>m.AccueilModule)},
    {path:"inscription",loadChildren:()=>import("./Modules/inscription/inscription.module").then(m=>m.InscriptionModule)},
    {path:"actualites-judo",loadChildren:()=>import("./Modules/actus/actus.module").then(m=>m.ActusModule)},
    {path:"videos",loadChildren:()=>import("./Modules/videos/videos.module").then(m=>m.VideosModule)},
    {path:"calendrier",loadChildren:()=>import("./Modules/calendrier/calendrier.module").then(m=>m.CalendrierModule)},
    {path:"champions",loadChildren:()=>import("./Modules/champion/champion.module").then(m=>m.ChampionModule)},
    {path:"resultats",loadChildren:()=>import("./Modules/resultats/resultats.module").then(m=>m.ResultatsModule)},
    {path:"membre",loadChildren:()=>import("./Modules/membre/membre.module").then(m=>m.MembreModule)},

    {path:"clubs",loadChildren:()=>import("./Modules/clubs/clubs.module").then(m=>m.ClubsModule)},

  
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserViewRoutingModule { }
