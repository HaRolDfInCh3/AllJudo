import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Subscription } from 'rxjs';
import { ChampionsService } from 'src/app/back-office/services-backoffice/champions.service';

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

  constructor(private userAuth:AuthentificationService,private stockage:StockageJwtService,private route: ActivatedRoute,private championService:ChampionsService,private pubService:PublicitesService,private router: Router,private msg: NzMessageService,private dataProvider:ProviderService) { }
url?:string
anniversaires:any
currentIndex?:number//positions courante
totalData?:number//taille totale recue
nombre_par_pages:number=5
debut_position_affichee?:number
subscription?: Subscription
fin_position_affichee?:number
championsAffiches:any//ce qui est a l'ecran
champions:any//la liste totale
derniers:any
liensdrapeaux?:string
lienspubs?:string
lettres:any=["","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
lettre_index=1
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

    this.championService.getAnniversaires().subscribe(
      data => {
       this.anniversaires=data.slice(0,data.length)
       console.log(" anniversaires",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des anniversaires")
        console.log("erreur survenue lors de la recuperation des anniversaires");
      }
    );
    this.subscription= this.championService.getAllChampionsByNameStartAsc("A",false).subscribe(
      data => {
        this.totalData=data.length
      
       this.champions=data.slice(0,this.totalData);
       this.championsAffiches=data.slice(0,this.nombre_par_pages);
       
       console.log("champions commencant par A",this.champions[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des champions commencant par A")
        console.log("erreur survenue lors de la recuperation des champions commencant par A");
      }
    );
   
    this.championService.getLastchampions().subscribe(
      data => {
       this.derniers=data
       console.log("champion recement ajoute",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des derniers champions")
        console.log("erreur survenue lors de la recuperation des derniers champions");
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
  this.championsAffiches=this.champions.slice(this.debut_position_affichee,this.fin_position_affichee)
  //console.log("De "+this.debut_position_affichee+" a "+this.fin_position_affichee)
}
currentDate = new Date();
calculateDiff(dateSent:Date){
  
  dateSent = new Date(dateSent);

  return Math.floor((this.currentDate.getFullYear()) - (dateSent.getFullYear()) ) ;
}
search():number{
    let recherche=""
 if(!this.recherche ){
    this.msg.error("parametres de recherche incomplets")
    return -1
  }
  recherche=this.recherche
  this.championService.getAllChampionsByName(recherche).subscribe(
    data => {
      if(data.length!=0){
        this.champions=data
     this.championsAffiches=data.slice(0,this.nombre_par_pages);
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
  gotoLien(id:number,position:number,texte:string){

  }
  changerLettre(index:number){
    this.subscription?.unsubscribe()
    let lettre=this.lettres[index]
    this.msg.info("champions commencant par "+lettre+" en cours de recuperation")
    this.championService.getAllChampionsByNameStartAsc(lettre,true).subscribe(
      
      data => {
        this.totalData=data.length
      
       this.champions=data.slice(0,this.totalData);
       this.championsAffiches=data.slice(0,this.nombre_par_pages);
       this.msg.success("champions commencant par "+lettre+" recuperes !")
       console.log("champions commencant par "+lettre,this.champions[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des champions commencant par "+lettre)
        console.log("erreur survenue lors de la recuperation des champions commencant par "+lettre);
      }
    );
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
