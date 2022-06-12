import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { PublicitesService } from 'src/app/user-view/services/publicites.service';
import { StockageJwtService } from 'src/app/back-office/services-backoffice/stockage-jwt.service';
import { Commentaire } from 'src/app/user-view/Models/classes/Commentaire';
import { AuthentificationService } from 'src/app/user-view/services/authentification.service';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id?:number
  currentVideo:any
  image="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  latestVideo:any
  user:any//recuperer l'utilisateur connecté
  lienspubs?:string
  url?:string

  //commentaires
  data: any;
  submitting = false;
  suggestions:any
  inputValue = '';
  constructor(private ecrit:EcritureService,private auth:AuthentificationService,private route: ActivatedRoute,private stockage:StockageJwtService,private router: Router,private pubService:PublicitesService,private msg: NzMessageService,private dataProvider:ProviderService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
      
  });

  this.dataProvider.getVideo(this.id||0).subscribe(
    data => {
     this.currentVideo=data
     console.log("Video",data)
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
    this.dataProvider.getAllCommentsByVideoId(this.id||0).subscribe(
      data => {
        if(data.length!=0){
          console.log("commentaire de cette Video",data[0])
       this.data=data
        }else{
          console.log("pas de commentaires pour cette video")
        }
       
       
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des commentaires")
      }
    );
    setTimeout(() => {
      this.dataProvider.getSimilarsVideo(this.currentVideo?.champion_id,this.currentVideo?.technique_id,this.currentVideo?.technique2_id,this.currentVideo?.evenement_id,).subscribe(
        data => {
         console.log("suggestion ",data[0])
         this.suggestions=data
         
        },
        err => {
          this.msg.error("erreur survenue lors de la recuperation des suggestions")
        }
      );

    }, 800);
    
   
    
  }

  detailsGauche(id:number,position:number){
    console.log(position)
    let element=this.latestVideo[position]
    if(element.Videocategorie2?.intitule=="Videos" ||element.Videocategorie2?.intitule=="Photos"||element.Videocategorie2?.intitule=="Articles sponsorisés"){
      this.msg.error("pas implementé")
    }else{
     // console.log("intitule",element.Videocategorie2?.intitule)
      this.router.navigate(['details/'+id],{relativeTo:this.route});
    }
    
  }
  detailsSuggestions(id:number,position:number){
    let element=this.suggestions[position]
    if(element.Videocategorie2?.intitule=="Videos" ||element.Videocategorie2?.intitule=="Photos"||element.Videocategorie2?.intitule=="Articles sponsorisés"){
      this.msg.error("pas implementé")
    }else{
     // this.router.navigate(['actualites-judo/details/', id]);
      this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['videos/details/' + id]));
      
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
            commentaire.video_id=this.id
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