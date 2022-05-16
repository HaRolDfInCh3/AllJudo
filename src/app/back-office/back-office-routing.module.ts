import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path:"home",component:MainPageComponent,children:[
    {path:"",component:HomeComponent},
    {path:"evenement",loadChildren:()=>import("../back-office/modules/evenement/evenement.module").then(m=>m.EvenementModule)},
    {path:"news",loadChildren:()=>import("../back-office/modules/news/news.module").then(m=>m.NewsModule)},
    {path:"evenementImportant",loadChildren:()=>import("../back-office/modules/evenement-important/evenement-important.module").then(m=>m.EvenementImportantModule)},
    {path:"script",loadChildren:()=>import("../back-office/modules/script/script.module").then(m=>m.ScriptModule)},
    {path:"annonces",loadChildren:()=>import("../back-office/modules/annonces/annonces.module").then(m=>m.AnnoncesModule)},
    {path:"stats",loadChildren:()=>import("../back-office/modules/stats/stats.module").then(m=>m.StatsModule)},
    {path:"pari",loadChildren:()=>import("../back-office/modules/pari/pari.module").then(m=>m.PariModule)},
    {path:"pub",loadChildren:()=>import("../back-office/modules/pub/pub.module").then(m=>m.PubModule)},
    {path:"boutiqueCommentaire",loadChildren:()=>import("../back-office/modules/boutique-commentaire/boutique-commentaire.module").then(m=>m.BoutiqueCommentaireModule)},
    {path:"boutique",loadChildren:()=>import("../back-office/modules/boutique/boutique.module").then(m=>m.BoutiqueModule)},
    {path:"technique",loadChildren:()=>import("../back-office/modules/technique/technique.module").then(m=>m.TechniqueModule)},
    {path:"commentaire",loadChildren:()=>import("../back-office/modules/commentaire/commentaire.module").then(m=>m.CommentaireModule)},
    {path:"validation",loadChildren:()=>import("../back-office/modules/validation/validation.module").then(m=>m.ValidationModule)},
    {path:"video",loadChildren:()=>import("../back-office/modules/video/video.module").then(m=>m.VideoModule)},
    {path:"galerie",loadChildren:()=>import("../back-office/modules/galerie/galerie.module").then(m=>m.GalerieModule)},
    {path:"clubAdmin",loadChildren:()=>import("../back-office/modules/club-admin/club-admin.module").then(m=>m.ClubAdminModule)},
    {path:"club",loadChildren:()=>import("../back-office/modules/club/club.module").then(m=>m.ClubModule)},
    {path:"resultatsAdmin",loadChildren:()=>import("../back-office/modules/resultats-admin/resultats-admin.module").then(m=>m.ResultatsAdminModule)},
    {path:"championAdmin",loadChildren:()=>import("../back-office/modules/champion-admin/champion-admin.module").then(m=>m.ChampionAdminModule)},
    {path:"champion",loadChildren:()=>import("../back-office/modules/champion/champion.module").then(m=>m.ChampionModule)},
    {path:"direct",loadChildren:()=>import("../back-office/modules/direct/direct.module").then(m=>m.DirectModule)},
    {path:"annonces",loadChildren:()=>import("../back-office/modules/annonces/annonces.module").then(m=>m.AnnoncesModule)}

  ]},
  {path:"",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
