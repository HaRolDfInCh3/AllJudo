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

  constructor(private userAuth:AuthentificationService,private stockage:StockageJwtService,private route: ActivatedRoute,private eventService:EvenementsService,private pubService:PublicitesService,private router: Router,private msg: NzMessageService,private dataProvider:ProviderService) { }
url?:string
//trimestre 1
currentIndex?:number//position courante
totalData?:number//taille totale recue
nombre_par_pages:number=2
debut_position_affichee?:number
fin_position_affichee?:number
evenementsAVenirAffiches:any//ce qui est a l'ecran
evenementsAVenir:any//la liste totale
//trimestre 2
currentIndex2?:number//position courante
totalData2?:number//taille totale recue
nombre_par_pages2:number=2
debut_position_affichee2?:number
fin_position_affichee2?:number
evenementsAVenirAffiches2:any//ce qui est a l'ecran
evenementsAVenir2:any//la liste totale
//trimestre 3
currentIndex3?:number//position courante
totalData3?:number//taille totale recue
nombre_par_pages3:number=2
debut_position_affichee3?:number
fin_position_affichee3?:number
evenementsAVenirAffiches3:any//ce qui est a l'ecran
evenementsAVenir3:any//la liste totale
//trimestre 4
currentIndex4?:number//position courante
totalData4?:number//taille totale recue
nombre_par_pages4:number=2
debut_position_affichee4?:number
fin_position_affichee4?:number
evenementsAVenirAffiches4:any//ce qui est a l'ecran
evenementsAVenir4:any//la liste totale

//------------
lienspubs?:string
ageCategorie?:number
titre1?:string
titre2?:string
titre3?:string
titre4?:string
debutTrimestre1:Date=new Date()
debutTrimestre2:Date=new Date()
debutTrimestre3:Date=new Date()
debutTrimestre4:Date=new Date()
ageCategories:any
evenementCategorie?:number
evenementCategories:any
size: NzSelectSizeType = 'default';
  ngOnInit(): void {
    this.debutTrimestre1.setMonth(this.debutTrimestre1.getMonth() );//  date du jour (Exemple:juin 2022)
    this.debutTrimestre2.setMonth(this.debutTrimestre1.getMonth() + 3);// 3 mois apres  (Exemple:sep 2022)
    
    this.debutTrimestre3.setMonth(this.debutTrimestre2.getMonth() + 3);//  3 mois apres  (Exemple:dec 2022)
    
    this.debutTrimestre4.setMonth(this.debutTrimestre3.getMonth() + 3);//  14/2022  (Exemple:mars 2023)
    
    let t1= this.debutTrimestre1.getMonth()
    let t2= this.debutTrimestre2.getMonth()
    let t3= this.debutTrimestre3.getMonth()
    let t4= this.debutTrimestre4.getMonth();

    this.titre1=(t1<=3)?"1er Trimestre":this.titre1
    this.titre2=(t2<=3)?"1er Trimestre":this.titre2
    this.titre3=(t3<=3)?"1er Trimestre":this.titre3
    this.titre4=(t4<=3)?"1er Trimestre":this.titre4

    this.titre1=(t1<=6 && t1>3)?"2eme Trimestre":this.titre1
    this.titre2=(t2<=6 && t2>3)?"2eme Trimestre":this.titre2
    this.titre3=(t3<=6 && t3>3)?"2eme Trimestre":this.titre3
    this.titre4=(t4<=6 && t4>3)?"2eme Trimestre":this.titre4

    this.titre1=(t1<=9 && t1>6)?"3eme Trimestre":this.titre1
    this.titre2=(t2<=9 && t2>6)?"3eme Trimestre":this.titre2
    this.titre3=(t3<=9 && t3>6)?"3eme Trimestre":this.titre3
    this.titre4=(t4<=9 && t4>6)?"3eme Trimestre":this.titre4
    
    this.titre1=( t1>9)?"4eme Trimestre":this.titre1
    this.titre2=( t2>9)?"4eme Trimestre":this.titre2
    this.titre3=  (t3>9)?"4eme Trimestre":this.titre3
    this.titre4=( t4>9)?"4eme Trimestre":this.titre4
    
    
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

    this.dataProvider.getAllEvCategoriesAge().subscribe(
      data => {
       this.ageCategories=data
       console.log(" cat d'age ",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation categories d'age")
        console.log("erreur survenue lors de la recuperation categories d'age");
      }
    );
    this.dataProvider.getAllEvCategoriesEvenement().subscribe(
      data => {
       this.evenementCategories=data
       console.log(" cat d'evenement ",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des categories d'evenement")
        console.log("erreur survenue lors de la recuperation des categories d'evenement");
      }
    );
    if(this.titre1=="1er Trimestre"){
      this.debutTrimestre1.setMonth(0)
      this.debutTrimestre1.setDate(1)
    }
    if(this.titre2=="1er Trimestre"){
      this.debutTrimestre2.setMonth(0)
      this.debutTrimestre2.setDate(1)
    }
    if(this.titre3=="1er Trimestre"){
      this.debutTrimestre3.setMonth(0)
      this.debutTrimestre3.setDate(1)
    }
    if(this.titre4=="1er Trimestre"){
      this.debutTrimestre4.setMonth(0)
      this.debutTrimestre4.setDate(1)
    }
    if(this.titre1=="2eme Trimestre"){
      this.debutTrimestre1.setMonth(3)
      this.debutTrimestre1.setDate(1)
    }
    if(this.titre2=="2eme Trimestre"){
      this.debutTrimestre2.setMonth(3)
      this.debutTrimestre2.setDate(1)
    }
    if(this.titre3=="2eme Trimestre"){
      this.debutTrimestre3.setMonth(3)
      this.debutTrimestre3.setDate(1)
    }
    if(this.titre4=="2eme Trimestre"){
      this.debutTrimestre4.setMonth(3)
      this.debutTrimestre4.setDate(1)
    }
    if(this.titre1=="3eme Trimestre"){
      this.debutTrimestre1.setMonth(6)
      this.debutTrimestre1.setDate(1)
    }
    if(this.titre2=="3eme Trimestre"){
      this.debutTrimestre2.setMonth(6)
      this.debutTrimestre2.setDate(1)
    }
    if(this.titre3=="3eme Trimestre"){
      this.debutTrimestre3.setMonth(6)
      this.debutTrimestre3.setDate(1)
    }
    if(this.titre4=="3eme Trimestre"){
      this.debutTrimestre4.setMonth(6)
      this.debutTrimestre4.setDate(1)
    }
    if(this.titre1=="4eme Trimestre"){
      this.debutTrimestre1.setMonth(9)
      this.debutTrimestre1.setDate(1)
    }
    if(this.titre2=="4eme Trimestre"){
      this.debutTrimestre2.setMonth(9)
      this.debutTrimestre2.setDate(1)
    }
    if(this.titre3=="4eme Trimestre"){
      this.debutTrimestre3.setMonth(9)
      this.debutTrimestre3.setDate(1)
    }
    if(this.titre4=="4eme Trimestre"){
      this.debutTrimestre4.setMonth(9)
      this.debutTrimestre4.setDate(1)
    }
    //recuperation donnees trimestre 1
    this.eventService.getNextEventsByTrimester(this.debutTrimestre1).subscribe(
      data => {
        this.totalData=data.length
       this.evenementsAVenir=data.slice(0,this.totalData);
       this.evenementsAVenirAffiches=data.slice(0,this.nombre_par_pages);
       console.log("trimestre 1",this.evenementsAVenir[0])
      },
      err => {
        this.msg.error("erreur recuperation   evenements a venir ")
        console.log("erreur recuperation   evenements a venir");
      }
    );
     //recuperation donnees trimestre 2
     this.eventService.getNextEventsByTrimester(this.debutTrimestre2).subscribe(
      data => {
        this.totalData2=data.length
       this.evenementsAVenir2=data.slice(0,this.totalData2);
       this.evenementsAVenirAffiches2=data.slice(0,this.nombre_par_pages2);
       console.log("trimestre 2",this.evenementsAVenir2[0])
      },
      err => {
        this.msg.error("erreur recuperation  evenements a venir")
        console.log("erreur recuperation  evenements a venir");
      }
    );
    //recuperation donnees trimestre 3
    this.eventService.getNextEventsByTrimester(this.debutTrimestre3).subscribe(
      data => {
        this.totalData3=data.length
       this.evenementsAVenir3=data.slice(0,this.totalData3);
       this.evenementsAVenirAffiches3=data.slice(0,this.nombre_par_pages3);
       console.log("trimestre 3",this.evenementsAVenir3[0])
      },
      err => {
        this.msg.error("erreur recuperation  evenements a venir")
        console.log("erreur recuperation  evenements a venir");
      }
    );
    //recuperation donnees trimestre 4
    this.eventService.getNextEventsByTrimester(this.debutTrimestre4).subscribe(
      data => {
        this.totalData4=data.length
       this.evenementsAVenir4=data.slice(0,this.totalData4);
       this.evenementsAVenirAffiches4=data.slice(0,this.nombre_par_pages4);
       console.log("trimestre 4",this.evenementsAVenir4[0])
      },
      err => {
        this.msg.error("erreur recuperation  evenements a venir")
        console.log("erreur recuperation  evenements a venir");
      }
    );
    
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
  this.evenementsAVenirAffiches=this.evenementsAVenir.slice(this.debut_position_affichee,this.fin_position_affichee)
  //console.log("De "+this.debut_position_affichee+" a "+this.fin_position_affichee)
}
getPages2(){
  if(this.currentIndex2){
    //console.log("index "+this.currentIndex+" taille "+this.nombre_par_pages)
    this.debut_position_affichee2=this.nombre_par_pages2*(this.currentIndex2-1)
  }
  else{
    this.debut_position_affichee2=0
  }
  this.fin_position_affichee2=this.debut_position_affichee2+this.nombre_par_pages2
  this.evenementsAVenirAffiches2=this.evenementsAVenir2.slice(this.debut_position_affichee2,this.fin_position_affichee2)
  //console.log("De "+this.debut_position_affichee+" a "+this.fin_position_affichee)
}
getPages3(){
  if(this.currentIndex3){
    //console.log("index "+this.currentIndex+" taille "+this.nombre_par_pages)
    this.debut_position_affichee3=this.nombre_par_pages3*(this.currentIndex3-1)
  }
  else{
    this.debut_position_affichee3=0
  }
  this.fin_position_affichee3=this.debut_position_affichee3+this.nombre_par_pages3
  this.evenementsAVenirAffiches3=this.evenementsAVenir3.slice(this.debut_position_affichee3,this.fin_position_affichee3)
  //console.log("De "+this.debut_position_affichee+" a "+this.fin_position_affichee)
}
getPages4(){
  if(this.currentIndex4){
    //console.log("index "+this.currentIndex+" taille "+this.nombre_par_pages)
    this.debut_position_affichee4=this.nombre_par_pages4*(this.currentIndex4-1)
  }
  else{
    this.debut_position_affichee4=0
  }
  this.fin_position_affichee4=this.debut_position_affichee4+this.nombre_par_pages4
  this.evenementsAVenirAffiches4=this.evenementsAVenir4.slice(this.debut_position_affichee4,this.fin_position_affichee4)
  //console.log("De "+this.debut_position_affichee+" a "+this.fin_position_affichee)
}
search():number{
    let ageCategorie=0
    let eventCategorie=0
  if(this.evenementCategorie && this.ageCategorie){
    this.msg.info("recherche par categorie d'evenement et d'age")
    ageCategorie=this.ageCategorie
    eventCategorie=this.evenementCategorie
  }else if(!this.ageCategorie && this.evenementCategorie){
    this.msg.info("recherche par categorie d'evenement")
    ageCategorie=-1
    eventCategorie=this.evenementCategorie
  }else if(this.ageCategorie && !this.evenementCategorie){
    this.msg.info("recherche par categorie d'age")
    ageCategorie=this.ageCategorie
    eventCategorie=-1
  }else if(!this.ageCategorie && !this.evenementCategorie){
    this.msg.error("parametres de recherche incomplets")
    return -1
  }
  //---------- resultats 1
  this.eventService.getNextEventsByCategorieAndAge(ageCategorie||0,eventCategorie||0,this.debutTrimestre1).subscribe(
    data => {
      if(data.length!=0){
        
     console.log("resultat de recherche 1",data[0])
      }else{
        this.msg.error("Aucun resultat trouvé !")
      }
      this.evenementsAVenir=data
     this.evenementsAVenirAffiches=data.slice(0,this.nombre_par_pages);
     this.totalData=data.length
    },
    err => {
      this.msg.error("erreur survenue lors de la recherche")
      console.log("erreur survenue lors de la recherche");
    }
  );
  //----------- resultats 2
  this.eventService.getNextEventsByCategorieAndAge(ageCategorie||0,eventCategorie||0,this.debutTrimestre2).subscribe(
    data => {
      if(data.length!=0){
        
     console.log("resultat de recherche 2",data[0])
      }else{
        this.msg.error("Aucun resultat trouvé !")
      }
      this.evenementsAVenir2=data
     this.evenementsAVenirAffiches2=data.slice(0,this.nombre_par_pages2);
     this.totalData2=data.length
    },
    err => {
      this.msg.error("erreur survenue lors de la recherche")
      console.log("erreur survenue lors de la recherche");
    }
  );
  //----------- resultats 3
  this.eventService.getNextEventsByCategorieAndAge(ageCategorie||0,eventCategorie||0,this.debutTrimestre3).subscribe(
    data => {
      if(data.length!=0){
        
     console.log("resultat de recherche 3",data[0])
      }else{
        this.msg.error("Aucun resultat trouvé !")
      }
      this.evenementsAVenir3=data
     this.evenementsAVenirAffiches3=data.slice(0,this.nombre_par_pages3);
     this.totalData3=data.length
      
    },
    err => {
      this.msg.error("erreur survenue lors de la recherche")
      console.log("erreur survenue lors de la recherche");
    }
  );
  //----------- resultats 4
  this.eventService.getNextEventsByCategorieAndAge(ageCategorie||0,eventCategorie||0,this.debutTrimestre4).subscribe(
    data => {
      if(data.length!=0){
        
     console.log("resultat de recherche 4",data[0])
      }else{
        this.msg.error("Aucun resultat trouvé !")
      }
      this.evenementsAVenir4=data
     this.evenementsAVenirAffiches4=data.slice(0,this.nombre_par_pages4);
     this.totalData4=data.length
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
