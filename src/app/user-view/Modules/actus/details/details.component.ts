import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NewsService } from 'src/app/back-office/services-backoffice/news.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { PublicitesService } from 'src/app/user-view/services/publicites.service';

import { StockageJwtService } from 'src/app/back-office/services-backoffice/stockage-jwt.service';
import { Commentaire } from 'src/app/user-view/Models/classes/Commentaire';
import { AuthentificationService } from 'src/app/user-view/services/authentification.service';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
//cette page donne le detail pour les news qui ne sont point des categories videos, photos
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id?:number
  currentNews:any
  image="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  latestNews:any
  user:any//recuperer l'utilisateur connecté
  lienspubs?:string
  url?:string
  liensNews2022?: string;
  //commentaires
  data: any;
  submitting = false;
  suggestions:any
  inputValue = '';
  constructor(private ecrit:EcritureService,private auth:AuthentificationService,private route: ActivatedRoute,private stockage:StockageJwtService,private router: Router,private newsService:NewsService,private pubService:PublicitesService,private msg: NzMessageService,private dataProvider:ProviderService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
      
  });
  this.liensNews2022=this.dataProvider.getLiensNews2022()
  this.newsService.getNews(this.id||0).subscribe(
    data => {
     this.currentNews=data
     console.log("news",data)
    },
    err => {
      this.msg.error("erreur survenue lors de la recuperation ")
      console.log("erreur survenue lors de la recuperation ");
    }
  );
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
    this.dataProvider.getAllCommentsByNewsId(this.id||0).subscribe(
      data => {
       console.log("commentaire de cette news",data[0])
       this.data=data
       
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des commentaires")
      }
    );
    setTimeout(() => {
      this.newsService.getNewsByCategorieAndType(this.id||0,this.currentNews?.newscategorie2?.intitule,this.currentNews?.type).subscribe(
        data => {
         console.log("suggestion ",data[0])
         this.suggestions=data
         
        },
        err => {
          this.msg.error("erreur survenue lors de la recuperation des suggestions")
        }
      );

    }, 800);
    
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
    
  }

  detailsGauche(id:number,position:number){
    console.log(position)
    let element=this.latestNews[position]
    if(element.newscategorie2?.intitule=="Videos" ){
      //l'id de a video correspondante, 5367 par exemple, est cache dans le champ url qui est sous la forme http://alljudo.net/video-de-judo-5367.html
      let url=element.url
      let videoid=0
      if(url.length<1 && element.texte.length>20){
        this.router.navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['actualites-judo/details/' + id]));
      }else{
      var infosurls = url.split("-");
      let partie1=infosurls[infosurls.length-1]
      var infosurls2=partie1.split(".")
      videoid=infosurls2[0]
      this.router.navigate(['videos/details/'+videoid]);
      }
      
     
      
    }else if(element.newscategorie2?.intitule=="Photos"){
      this.router.navigate(['diaporama/'+id],{relativeTo:this.route});
    }else{
     // console.log("intitule",element.newscategorie2?.intitule)
     this.router.navigateByUrl('/', { skipLocationChange: true })
     .then(() => this.router.navigate(['actualites-judo/details/' + id]));
    }
    
  }
  detailsSuggestions(id:number,position:number){
    let element=this.suggestions[position]
    if(element.newscategorie2?.intitule=="Videos" ||element.newscategorie2?.intitule=="Photos"||element.newscategorie2?.intitule=="Articles sponsorisés"){
      this.msg.error("pas implementé")
    }else{
     // this.router.navigate(['actualites-judo/details/', id]);
      this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['actualites-judo/details/' + id]));
      
    }
    
  }

  gotoLien(id:number,lien:string){

  }
  handleSubmit(): void {
    if(this.stockage.getUserNormal()){
          let userStocke=JSON.parse(this.stockage.getUserNormal()||"{sociopathe:psychopathe}")
          this.auth.getUserByUsername(userStocke.login_front).subscribe(
            data => {
             this.user=data
             //console.log("current user ",data)
            },
            err => {
              this.msg.error("erreur survenue lors de la recuperation de l'utilisateur")
             // console.log("erreur survenue lors de la recuperation de l'utilisateur");
            }
          );
          //console.log("utilisateur recuperé : ",userStocke)
          
          this.submitting = true;
          const content = this.inputValue;
          this.inputValue = '';
          setTimeout(() => {
            this.submitting = false;
            let commentaire=new Commentaire()
            commentaire.commentaire=content;
            commentaire.user_id=this.user.id
            commentaire.news_id=this.id
            commentaire.date=new Date()
            this.ecrit.addCommentaire(commentaire).subscribe(
              data => {
               // console.log("envoyé",data)
               console.log("recu",data)
               this.data = [
                ...this.data,data
              ]
               this.msg.success("Votre commentaire a bien été ajouté")
              },
              err => {
                this.msg.error("erreur survenue lors de l'ajout")
                //console.log("erreur survenue lors de l'ajout");
              }
            );
           
          }, 800);
    }else{
      this.msg.error("Authentifiez vous en premier")
    }
    
  }
}