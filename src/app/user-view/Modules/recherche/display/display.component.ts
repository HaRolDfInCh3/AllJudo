import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ChampionsService } from 'src/app/back-office/services-backoffice/champions.service';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { StockageJwtService } from 'src/app/back-office/services-backoffice/stockage-jwt.service';
import { PublicitesService } from 'src/app/user-view/services/publicites.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  keyword: string="";
  subscription3$?: Subscription 

  url?:string
  imagesList:any
  videosList:any
  videosListAffichees:any
  liensList:any
  lienspubs?:string
 
  subscriptions: Subscription[] = []
  constructor(@Inject(LOCALE_ID) private locale: string,private stockage:StockageJwtService,private championService:ChampionsService,private route: ActivatedRoute,private eventService:EvenementsService,private pubService:PublicitesService,private router: Router,private msg: NzMessageService,private dataProvider:ProviderService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.keyword = params["keyword"].split("_").join(" ");
    });
    this.lienspubs=this.dataProvider.getLiensPubs()
    this.subscription3$=this.pubService.getRandomBanniere_par_taille("300x250").subscribe(
      data => {
        console.log(data)
        if(data.image){
          this.url=this.lienspubs+data.image
        }
        
      },
      err => {
        //this.msg.error("erreur survenue lors de la recuperation de la banniere")
        console.log("erreur survenue lors de la recuperation de la banniere");
      }
    );
    this.dataProvider.getGoogleSearchResultsByKeyword(this.keyword,10).subscribe(
      data=>{
        this.msg.success("liens google recupérés")
          this.liensList=data
          console.log(this.liensList)
      },
      err=>{
          this.msg.error("erreur recuperation liens")
      }
    )
    this.dataProvider.getImagesByKeyword(this.keyword,10).subscribe(
      data=>{
        this.msg.success("images google recupérés")
          this.imagesList=data
          console.log(this.imagesList)
      },
      err=>{
          this.msg.error("erreur recuperation images")
      }
    )
    this.dataProvider.getYoutubeVideosByKeyword(this.keyword).subscribe(
      data=>{
        this.msg.success("videos youtube recues")
        console.log("exemple de video youtube ",data[0])
        this.totalData=data.length
        this.videosList=data.slice(0,this.totalData);
        this.videosListAffichees=data.slice(0,this.nombre_par_pages);
      },
      err=>{
        this.msg.error("erreur survenue lors de la recuperation des videos youtube")
      }
     )
this.subscriptions?.push(this.subscription3$)
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
}



//modal pour les images
isVisible = false;
title="";
src="";
showModal(data:any): void {
  this.src=data.src
  this.title=data.nom
  this.isVisible = true;
}
handleCancel(): void {
  this.isVisible = false;
}

//pagination videos
debut_position_affichee?:number
fin_position_affichee?:number
nombre_par_pages:number=5
currentIndex?:number//position courante
totalData?:number//taille totale recue
getVideosPages(){
  if(this.currentIndex){
    this.debut_position_affichee=this.nombre_par_pages*(this.currentIndex-1)
  }
  else{
    this.debut_position_affichee=0
  }
  this.fin_position_affichee=this.debut_position_affichee+this.nombre_par_pages
  this.videosListAffichees=this.videosList.slice(this.debut_position_affichee,this.fin_position_affichee)
 
}
}
