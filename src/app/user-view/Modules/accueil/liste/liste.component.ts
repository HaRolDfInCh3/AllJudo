import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NewsService } from 'src/app/back-office/services-backoffice/news.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { StockageJwtService } from 'src/app/back-office/services-backoffice/stockage-jwt.service';
import { AuthentificationService } from 'src/app/user-view/services/authentification.service';
import { PublicitesService } from 'src/app/user-view/services/publicites.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  constructor(private userAuth:AuthentificationService,private route: ActivatedRoute,private stockage:StockageJwtService,private newsService:NewsService,private pubService:PublicitesService,private router: Router,private msg: NzMessageService,private dataProvider:ProviderService) { }
url?:string
latestNews:any
latestEvents:any
mainlatestNews:any
nextEvents:any
liensdrapeaux?:string
liensNews2022?:string
lienspubs?:string
newsAlaUne:any

  ngOnInit(): void {
    this.liensdrapeaux=this.dataProvider.getLiensDrapeaux()
    this.liensNews2022=this.dataProvider.getLiensNews2022()
    this.lienspubs=this.dataProvider.getLiensPubs()
    this.pubService.getRandomBanniere_par_taille("300x250").subscribe(
      data => {
        console.log(data)
        if(data.image){
          this.url=this.lienspubs+data.image
        }
        
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation de la banniere")
        console.log("erreur survenue lors de la recuperation de la banniere");
      }
    );

    this.newsService.getLatestNews().subscribe(
      data => {
       this.latestNews=data
       console.log("latest news",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des derniers news droites")
        console.log("erreur survenue lors de la recuperation des derniers news droites");
      }
    );
    this.newsService.getLatestNewsAladeux(16).subscribe(
      data => {
       this.mainlatestNews=data
       console.log("main latest news",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des derniers news gauche")
        console.log("erreur survenue lors de la recuperation des derniers news gauche");
      }
    );
    this.newsService.getLatestNewsAlaUne(2).subscribe(
      data => {
       this.newsAlaUne=data
       console.log("a la une latest news",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des derniers news a la une")
        console.log("erreur survenue lors de la recuperation des derniers news a la une");
      }
    );

    this.dataProvider.getLastEvents().subscribe(
      data => {
       this.latestEvents=data
       console.log("latest evenements",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des derniers evenements")
        console.log("erreur survenue lors de la recuperation des derniers evenements");
      }
    );

    this.dataProvider.getNextEventsDesc().subscribe(
      data => {
       this.nextEvents=data
       console.log("next evenements",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des prochains evenements")
        console.log("erreur survenue lors de la recuperation des prochains evenemeents");
      }
    );
  }

  details(id:number){
    this.router.navigate(['details/'+id],{relativeTo:this.route});
  }
  resultatsEvenement(id:number){
    //this.router.navigate(['details/'+id],{relativeTo:this.route});
  }

  gotoLien(id:number,position:number,texte:string){

  }
  abonnement(){
    if(!this.stockage.getUserNormal()){
      this.msg.info("veuillez vous authentifier")
    }else{
      let user=this.stockage.getUserNormalDetails()
      if(user.newsletter==true){
        this.msg.info("Vous etiez deja abonné(e)")
      }else{
        user.newsletter=true
        this.userAuth.updateUser(user,false).subscribe(
          data=>{
            this.msg.success("Vous etes abonné(e)")
          },
          err=>{
            console.log(user)
            this.msg.error("mise a jour impossible")
          }
        )
       
      }
    }
  }
  ajouter_tournoi(){
    if(!this.stockage.getUserNormal()){
      this.msg.info("veuillez vous authentifier")
    }else{
      this.router.navigate(['/calendrier/ajouter-tournoi']);
    }
  }
  
}
