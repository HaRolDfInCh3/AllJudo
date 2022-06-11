import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { PublicitesService } from 'src/app/user-view/services/publicites.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private eventService:EvenementsService,private pubService:PublicitesService,private router: Router,private msg: NzMessageService,private dataProvider:ProviderService) { }
url?:string
id?:number
evenementAffiche:any//ce qui est a l'ecran
listOfData:any;
listOfDisplayedData:any;
lienspubs?:string
resultatsAnciens:any
listOfResults:any;
liensdrapeaux?:string
liensMedailles?:string
listOfDisplayedResults:any;
pdfLinks:String=""
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
  this.liensdrapeaux=this.dataProvider.getLiensDrapeaux()
  this.pdfLinks=this.dataProvider.getLiensPdfs()
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
    this.eventService.getEvenement(this.id||0).subscribe(
      data => {
       this.evenementAffiche=data
       console.log("evenement: ",data)
        this.msg.success("Données evenement recuperées");
        if(this.evenementAffiche.type=="Equipe"){
          this.eventService.getClassementClubParEvenementID(this.id||0).subscribe(
            data => {
              this.listOfDisplayedData=data
              this.listOfData=data
              console.log("classement par club",data[0]);
            },
            err => {
              this.msg.error('Erreur survenue lors du chargement du classement: '+err.error);
            })
            this.eventService.getclassementChampionsParClubAndEvenementID(this.id||0).subscribe(
              data => {
                this.listOfDisplayedResults=data
                this.listOfResults=data
                console.log("exemple de resultats",data[0]);
              },
              err => {
                this.msg.error('Erreur survenue lors du chargement de resultats: '+err.error);
              })
        }else{
          this.eventService.getClassementPaysParEvenementID(this.id||0).subscribe(
            data => {
              this.listOfDisplayedData=data
              this.listOfData=data
              console.log("classement par pays",data[0]);
            },
            err => {
              this.msg.error('Erreur survenue lors du chargement du classement: '+err.error);
            })
            this.eventService.getclassementChampionsParEvenementID(this.id||0).subscribe(
              data => {
                this.listOfDisplayedResults=data
                this.listOfResults=data
                console.log("exemple de resultats",data[0]);
              },
              err => {
                this.msg.error('Erreur survenue lors du chargement de resultats: '+err.error);
              })
        }
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des infos evenement")
        console.log("erreur survenue lors de la recuperation des infos evenement");
      }
    );
    this.eventService.getResultatsAnciens(this.currentDate.getFullYear()).subscribe(
      data => {
       this.resultatsAnciens=data.slice(0,data.length)
       console.log(" resultatsAnciens",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des resultatsAnciens")
        console.log("erreur survenue lors de la recuperation des resultatsAnciens");
      }
    );
   
     
        
      
        
        
        
          this.dataProvider.getVideosbyEvenementID(this.id||0).subscribe(
            data => {
              this.totalVideos=data.length
              this.listOfVideos=data.slice(0,this.totalVideos);
              this.listOfDisplayedVideos=data.slice(0,this.nombre_videos_par_pages);
              
              console.log("exemple de video",data[0]);
            },
            err => {
              this.msg.error('Erreur survenue lors du chargement des videos: '+err.error);
            })
            this.dataProvider.getAllImageByEvenementID(this.id||0).subscribe(
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
listOfCurrentPageData:any
//videos details
currentVideoIndex?:number//position courante
totalVideos?:number//taille totale recue
nombre_videos_par_pages:number=5
debut_video_affichee?:number
fin_video_affichee?:number
sexeAffiche="Mixte(MF)"
//filtrer les classements par sexe
getCLassementBySexe(sexe:string){
  
  if(sexe=="MF"){
    this.sexeAffiche="Mixte(MF)"
    this.eventService.getClassementPaysParEvenementID(this.id||0).subscribe(
      data => {
        this.listOfDisplayedData=data
        this.listOfData=data
        console.log("reset classement par pays",data[0]);
      },
      err => {
        this.msg.error('Erreur survenue lors du reset du classement: '+err.error);
      })
  }else{
    if(sexe=="M"){
      this.sexeAffiche="Masculin(M)"
    }else{
      this.sexeAffiche="Feminin(F)"
    }
    this.eventService.getClassementPaysParEvenementIDetParSexe(this.id||0,sexe).subscribe(
      data => {
        this.listOfDisplayedData=data
        this.listOfData=data
        console.log("classement par pays fitré",data[0]);
      },
      err => {
        this.msg.error('Erreur survenue lors du filtrage du classement: '+err.error);
      })
  }
  
}

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
//tri acendants  et descendants 
trier_premier={
  sortOrder: null,
      sortFn: (a: any, b: any) => a.total_premiere_place - b.total_premiere_place,
      sortDirections: ['ascend', 'descend', null],
}
trier_deuxieme={
  sortOrder: null,
      sortFn: (a: any, b: any) => a.total_deuxieme_place - b.total_deuxieme_place,
      sortDirections: ['ascend', 'descend', null],
}
trier_troisieme={
  sortOrder: null,
      sortFn: (a: any, b: any) => a.total_troisieme_place - b.total_troisieme_place,
      sortDirections: ['ascend', 'descend', null],
}
trier_cinquieme={
  sortOrder: null,
      sortFn: (a: any, b: any) => a.total_cinquieme_place - b.total_cinquieme_place,
      sortDirections: ['ascend', 'descend', null],
}
trier_septieme={
  sortOrder: null,
      sortFn: (a: any, b: any) => a.total_septieme_place - b.total_septieme_place,
      sortDirections: ['ascend', 'descend', null],
}

}


