import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { ChampionsService } from 'src/app/back-office/services-backoffice/champions.service';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';

import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { StockageJwtService } from 'src/app/back-office/services-backoffice/stockage-jwt.service';
import { Champion_admin_externe } from 'src/app/user-view/Models/classes/Champion_admin_externe';
import { PublicitesService } from 'src/app/user-view/services/publicites.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  

  constructor(private route: ActivatedRoute,private stockage:StockageJwtService,private eventService:EvenementsService,private championService:ChampionsService,private pubService:PublicitesService,private router: Router,private msg: NzMessageService,private dataProvider:ProviderService) { }
url?:string
id?:number
liensMedailles?: string;
championAffiche:any//ce qui est a l'ecran
listOfData:any;
listOfDisplayedData:any;
lienspubs?:string
listOfResults:any;
listOfDisplayedResults:any;
listOfFans:any;
listOfDisplayedFans:any;
listOfVideos:any;
listOfDisplayedVideos:any;
listOfImages:any;
listOfDisplayedImages:any;
liensImages=""
size: NzSelectSizeType = 'default';
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
      
  });
  this.liensMedailles=this.dataProvider.getMedaillesLiens()
    this.liensImages=this.dataProvider.getLiensGalerie()
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
    this.championService.getChampion(this.id||0).subscribe(
      data => {
       this.championAffiche=data
       console.log("Champion: ",data)
        this.msg.success("Données champion recuperées");
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des infos champion")
        console.log("erreur survenue lors de la recuperation des infos champion");
      }
    );
    this.eventService.getPalmaresById(this.id||0).subscribe(
      data => {
        this.listOfDisplayedData=data
        this.listOfData=data
        console.log("exemple de palmares",data[0]);
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement du palmares: '+err.error);
      })
      this.eventService.getChampionResultsByYear(this.id||0).subscribe(
        data => {
          this.listOfDisplayedResults=data
          this.listOfResults=data
          console.log("exemple de resultats",data[0]);
        },
        err => {
          this.msg.error('Erreur survenue lors du chargement de resultats: '+err.error);
        })
        this.championService.getAllFans(this.id||0).subscribe(
          data => {
            this.listOfDisplayedFans=data
            this.listOfFans=data
            console.log("exemple de fan",data[0]);
          },
          err => {
            this.msg.error('Erreur survenue lors du chargement des fans: '+err.error);
          })
          this.dataProvider.getVideosbyChampionID(this.id||0).subscribe(
            data => {
              this.totalVideos=data.length
              this.listOfVideos=data.slice(0,this.totalVideos);
              this.listOfDisplayedVideos=data.slice(0,this.nombre_videos_par_pages);
              
              console.log("exemple de video",data[0]);
            },
            err => {
              this.msg.error('Erreur survenue lors du chargement des videos: '+err.error);
            })
            this.dataProvider.getAllImageByChampionId(this.id||0).subscribe(
              data => {
                this.listOfDisplayedImages=data
                this.listOfImages=data
                console.log("exemple de image",data[0]);
              },
              err => {
                this.msg.error('Erreur survenue lors du chargement des images: '+err.error);
              })

   
  }
  
  
  resultatsEvenement(id:number){
    //this.router.navigate(['details/'+id],{relativeTo:this.route});
  }

currentDate = new Date();
calculateDiff(dateSent:Date){
  
  dateSent = new Date(dateSent);

  return Math.floor((this.currentDate.getFullYear()) - (dateSent.getFullYear()) ) ;
}

//recherche par categorie age dans le palmares

catAge = '';
visible = false;
reset(): void {
  this.catAge = '';
  this.search();
}

search(): void {
  this.visible = false;
  this.listOfDisplayedData= this.listOfData.filter((item: any) => item.categorie_age.indexOf(this.catAge) !== -1);
}
onCurrentPageDataChange($event: any): void {
  this.listOfCurrentPageData = $event;
}


checked = false;
indeterminate = false;
listOfCurrentPageData: any;



catEvent = '';
visible2 = false;
reset2(): void {
  this.catEvent = '';
  this.search2();
}

search2(): void {
  this.visible2 = false;
  this.listOfDisplayedData= this.listOfData.filter((item: any) => item.categorie_evenement.indexOf(this.catEvent) !== -1);
}

//tableau des resultats
onCurrentPageDataChange2($event: any): void {
  this.listOfCurrentPageData2 = $event;
}

checked2 = false;
indeterminate2 = false;
listOfCurrentPageData2: any;

//tableau des fans
onCurrentPageDataChange3($event: any): void {
  this.listOfCurrentPageData3 = $event;
}

checked3 = false;
indeterminate3 = false;
listOfCurrentPageData3: any;

fan = '';
visible3 = false;
reset3(): void {
  this.fan = '';
  this.search3();
}

search3(): void {
  this.visible3 = false;
  this.listOfDisplayedFans= this.listOfFans.filter((item: any) => item.user2.username.indexOf(this.fan) !== -1);
}
//videos details
currentVideoIndex?:number//position courante
totalVideos?:number//taille totale recue
nombre_videos_par_pages:number=5
debut_video_affichee?:number
fin_video_affichee?:number


detailsGauche(id:number,position:number){
  console.log(position)
  let element=this.listOfDisplayedVideos[position]
  
   // aller vers details du module video
   //http://localhost:4200/videos/details/5372
    this.router.navigate(['/videos/details/'+element.id]);
  
  
}
getPages(){
  if(this.currentVideoIndex){
    //console.log("index "+this.currentVideoIndex+" taille "+this.nombre_videos_par_pages)
    this.debut_video_affichee=this.nombre_videos_par_pages*(this.currentVideoIndex-1)
  }
  else{
    this.debut_video_affichee=0
  }
  this.fin_video_affichee=this.debut_video_affichee+this.nombre_videos_par_pages
  this.listOfDisplayedVideos=this.listOfVideos.slice(this.debut_video_affichee,this.fin_video_affichee)
  //console.log("De "+this.debut_video_affichee+" a "+this.fin_video_affichee)
}
//modal pour les images
isVisible = false;
title="";
src="";
showModal(data:any): void {
  this.src=this.liensImages+"/"+data.galerie_id+"/"+data.nom
  this.title=data.nom
  this.isVisible = true;
}
handleCancel(): void {
  this.isVisible = false;
}
envoyer_demande(){
  if(!this.stockage.getUserNormal()){
    this.msg.info("veuillez vous authentifier")
  }else{
    this.router.navigate(['/champions/demandeAdmin/'+this.id]);
  }
  
}
}

