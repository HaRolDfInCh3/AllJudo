import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';
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

 
  constructor(private userAuth:AuthentificationService,private stockage:StockageJwtService,private route: ActivatedRoute,private evenementService:EvenementsService,private pubService:PublicitesService,private router: Router,private msg: NzMessageService,private dataProvider:ProviderService) { }
url?:string
resultatsAnciens:any
currentIndex?:number//positions courante
totalData?:number//taille totale recue
nombre_par_pages:number=60
rechercheCombinee = true;
debut_position_affichee?:number
fin_position_affichee?:number
evenementsAffiches:any//ce qui est a l'ecran
evenements:any//la liste totale
derniers:any
liensdrapeaux?:string
lienspubs?:string
catAge?:number
listOfcatAge:any
catEvent?:number
listOfEvent:any
annee?:string
listAnnee:any
recherche?:string

size: NzSelectSizeType = 'default';
  ngOnInit(): void {
    this.liensdrapeaux=this.dataProvider.getLiensDrapeaux()

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

    this.evenementService.getResultatsAnciens(this.currentDate.getFullYear()).subscribe(
      data => {
       this.resultatsAnciens=data.slice(0,data.length)
       console.log(" resultatsAnciens",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des resultatsAnciens")
        console.log("erreur survenue lors de la recuperation des resultatsAnciens");
      }
    );
    this.dataProvider.getAllEvCategoriesAge().subscribe(
      data => {
        this.listOfcatAge=data
      },
      err => {
        console.log("erreur survenue lors du chargement des categories d'age");
        this.msg.error("erreur survenue lors du chargement des categories d'age");
      }
    );
    this.dataProvider.getAllEvCategoriesEvenement().subscribe(
      data => {
        this.listOfEvent=data
      },
      err => {
        console.log("erreur survenue lors du chargement des categories d'evenement");
        this.msg.error("erreur survenue lors du chargement des categories d'evenement");
      }
    );
    this.dataProvider.getAllEventsYears().subscribe(
      data => {
        this.listAnnee=data
      },
      err => {
        console.log("erreur survenue lors du chargement des annees");
        this.msg.error("erreur survenue lors du chargement des annees");
      }
    );
    this.evenementService.getAllEvenementsByDateDesc().subscribe(
      data => {
        this.totalData=data.length
      
       this.evenements=data.slice(0,this.totalData);
       this.evenementsAffiches=data.slice(0,this.nombre_par_pages);
       
       console.log("exemple evenement ",this.evenements[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des evenements")
        console.log("erreur survenue lors de la recuperation des evenements");
      }
    );
   
    
  }
  detailsGauche(id:number,position:number){
    console.log(position)
      this.router.navigate(['details/'+id],{relativeTo:this.route});
    
    
  }
  
  resultatsEvenement(id:number){
    //this.router.navigate(['details/'+id],{relativeTo:this.route});
  }
getPages(){
  if(this.currentIndex){
    //console.log("index "+this.currentIndex+" taille "+this.nombre_par_pages)
    this.debut_position_affichee=this.nombre_par_pages*(this.currentIndex-1)
  }
  else{
    this.debut_position_affichee=0
  }
  this.fin_position_affichee=this.debut_position_affichee+this.nombre_par_pages
  this.evenementsAffiches=this.evenements.slice(this.debut_position_affichee,this.fin_position_affichee)
  //console.log("De "+this.debut_position_affichee+" a "+this.fin_position_affichee)
}
currentDate = new Date();
calculateDiff(dateSent:Date){
  
  dateSent = new Date(dateSent);

  return Math.floor((this.currentDate.getFullYear()) - (dateSent.getFullYear()) ) ;
}
// recherche du haut
search():number{
    let recherche=""
 if(!this.recherche ){
    this.msg.error("parametres de recherche incomplets")
    return -1
  }
  recherche=this.recherche
  this.msg.info("recherche :"+recherche)
  this.evenementService.getEventsByMotCle_In_Categorie_Age_Nom(recherche).subscribe(
    data => {
      if(data.length!=0){
        this.evenements=data
     this.evenementsAffiches=data.slice(0,this.nombre_par_pages);
     this.totalData=data.length
     console.log("resultat de recherche",data[0])
      }else{
        this.msg.error("Aucun resultat trouvé !")
      }
      
    },
    err => {
      this.msg.error("erreur survenue lors de la recherche")
      console.log("erreur survenue lors de la recherche");
    }
  );
  return 0

}
// recherche du bas
search2():number{
  let annee="2022"
  let catAge=-1
  let catEven=-1
if(!this.annee && !this.catAge && !this.catEvent){
  this.msg.error("parametres de recherche incomplets")
  return -1
}
if(this.annee){
  annee=this.annee.toString()
}
if(this.catEvent){
  catEven=this.catEvent
}
if(this.catAge){
  catAge=this.catAge
}
if(this.rechercheCombinee){
  this.evenementService.getEventsByCategorieAndAgeAndDate(catEven,catAge,annee).subscribe(
    data => {
      if(data.length!=0){
        this.evenements=data
        this.evenementsAffiches=data.slice(0,this.nombre_par_pages);
        this.totalData=data.length
        console.log("resultat de recherche",data[0])
      }else{
        this.msg.error("Aucun resultat trouvé !")
      }
      
    },
    err => {
      this.msg.error("erreur survenue lors de la recherche")
      console.log("erreur survenue lors de la recherche");
    }
  );
}else{
  this.evenementService.getEvents_ByCategorie_ByAge_ByDate(catEven,catAge,annee).subscribe(
    data => {
      if(data.length!=0){
        this.evenements=data
        this.evenementsAffiches=data.slice(0,this.nombre_par_pages);
        this.totalData=data.length
        console.log("resultat de recherche",data[0])
      }else{
        this.msg.error("Aucun resultat trouvé !")
      }
      
    },
    err => {
      this.msg.error("erreur survenue lors de la recherche")
      console.log("erreur survenue lors de la recherche");
    }
  );
}

return 0

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
