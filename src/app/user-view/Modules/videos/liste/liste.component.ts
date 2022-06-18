import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { VideoCategorie } from 'src/app/back-office/models/enums/VideoCategorie';
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
  videoCategorie= VideoCategorie;
  getVideoCategories() : Array<string> {
    var keys = Object.keys(this.videoCategorie);
    return keys.slice(keys.length / 2);
}
  constructor(private userAuth:AuthentificationService,private stockage:StockageJwtService,private route: ActivatedRoute,private pubService:PublicitesService,private router: Router,private msg: NzMessageService,private dataProvider:ProviderService) { }
  url?:string
  latestVideo:any
  currentIndex?:number//position courante
  totalData?:number//taille totale recue
  nombre_par_pages:number=5
  debut_position_affichee?:number
  fin_position_affichee?:number
  videoGaucheBasAffiches:any//ce qui est a l'ecran
  videoGaucheBas:any//la liste totale


  lienspubs?:string
  
  VideoGaucheHaut:any
  recherche?:string
  videocategorie?:string
  size: NzSelectSizeType = 'default';
    ngOnInit(): void {
      
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
      this.dataProvider.getAllVideos().subscribe(
        data => {
          this.totalData=data.length
         this.videoGaucheBas=data.slice(0,this.totalData);
         this.videoGaucheBasAffiches=data.slice(0,this.nombre_par_pages);
         console.log("video gauche bas",this.videoGaucheBas[0])
        },
        err => {
          this.msg.error("erreur survenue lors de la recuperation des derniers news gauche")
          console.log("erreur survenue lors de la recuperation des derniers news gauche");
        }
      );
  
      
     
      
      
      
    }
    detailsGauche(id:number,position:number){
      console.log(position)
      let element=this.videoGaucheBasAffiches[position]
      
       // console.log("intitule",element.Videocategorie2?.intitule)
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
    this.videoGaucheBasAffiches=this.videoGaucheBas.slice(this.debut_position_affichee,this.fin_position_affichee)
    //console.log("De "+this.debut_position_affichee+" a "+this.fin_position_affichee)
  }
  search():number{
      let recherche=""
      let categorie=""
    if(this.recherche && this.videocategorie){
      this.msg.info("recherche avec catégorie et mot clé")
      recherche=this.recherche
      categorie=this.videocategorie
    }else if(!this.recherche && this.videocategorie){
      this.msg.info("recherche avec catégorie seule")
      recherche="any"
      categorie=this.videocategorie
    }else if(this.recherche && !this.videocategorie){
      this.msg.info("recherche avec  mot clé seul")
      recherche=this.recherche
      categorie="any"
    }else if(!this.recherche && !this.videocategorie){
      this.msg.error("parametres de recherche incomplets")
      return -1
    }
    this.dataProvider.getVideoByTitreOrCategorie(recherche,categorie).subscribe(
      data => {
        if(data.length!=0){
          this.videoGaucheBas=data
       this.videoGaucheBasAffiches=data.slice(1,this.nombre_par_pages);
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
  