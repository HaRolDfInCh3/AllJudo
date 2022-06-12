import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Subscription } from 'rxjs';
import { ChampionsService } from 'src/app/back-office/services-backoffice/champions.service';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { StockageJwtService } from 'src/app/back-office/services-backoffice/stockage-jwt.service';
import { User } from 'src/app/user-view/Models/classes/User';
import { AuthentificationService } from 'src/app/user-view/services/authentification.service';
import { PublicitesService } from 'src/app/user-view/services/publicites.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  clubs: any;
  listePays: any;
  championsModifiables:any
  constructor(private stockage:StockageJwtService,private auth:AuthentificationService,private fb: FormBuilder,private championService:ChampionsService,private route: ActivatedRoute,private eventService:EvenementsService,private pubService:PublicitesService,private router: Router,private msg: NzMessageService,private dataProvider:ProviderService) { }
  subscription1$?: Subscription 
    subscription2$?: Subscription 
    subscription3$?: Subscription 
    subscriptions: Subscription[] = []
  size: NzSelectSizeType = 'large';
  url?:string
  userAffiche:any//ce qui est a l'ecran
  caeList:any
  caeListAcceptes:any
  lienspubs?:string
  userForm!: FormGroup;
  ngOnInit(): void {
    this.userForm = this.fb.group({
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      paysID: [null, [Validators.required]],
      password: [null, ],
      checkpassword: [null, ],
      email: [null, ],
      ville: [null, ],
      dateNaissance: [null,[Validators.required]],
      codePostal: [null ,],
      grade: [null, [Validators.required]],
      club: [null, [Validators.required]],
      offres: [null, ],
      newsletter: [null, ],
      username: [null, ],
      changerMDP: [null, ],
      
    });
   
  this.lienspubs=this.dataProvider.getLiensPubs()
  this.subscription3$= this.pubService.getRandomBanniere_par_taille("300x250").subscribe(
      data => {
        console.log(data)
        if(data.image){
          this.url=this.lienspubs+data.image
        }
        
      },
      err => {
       // this.msg.error("erreur survenue lors de la recuperation de la banniere")
        console.log("erreur survenue lors de la recuperation de la banniere");
      }
    );
    
    this.userAffiche=this.stockage.getUserNormalDetails();
    //populer les donnees
    console.log(this.userAffiche)
    this.championService.getChampionModifiablesParUserID(this.userAffiche.id).subscribe(
          data=>{
              this.championsModifiables=data
          },err=>{
            console.log("erreur lors de la recuperation des champions modifiables !")
              //this.msg.error("erreur lors de la recuperation des champions modifiables !")
          }
      )
    this.userForm.controls['nom'].patchValue( this.userAffiche.nom);
    this.userForm.controls['prenom'].patchValue( this.userAffiche.prenom);
    this.userForm.controls['email'].patchValue( this.userAffiche.email);
    this.userForm.controls['ville'].patchValue( this.userAffiche.ville);
    this.userForm.controls['dateNaissance'].patchValue( new Date(this.userAffiche.date_naissance));
    this.userForm.controls['paysID'].patchValue( this.userAffiche.pays);
    this.userForm.controls['codePostal'].patchValue( this.userAffiche.code_postale);
    this.userForm.controls['grade'].patchValue( this.userAffiche.grade);
    this.userForm.controls['club'].patchValue( this.userAffiche.club);
    this.userForm.controls['offres'].patchValue( this.userAffiche.offres);
    this.userForm.controls['newsletter'].patchValue( this.userAffiche.newsletter);
    this.userForm.controls['username'].patchValue( this.userAffiche.username);

    //fin
    this.championService.getNonActifsChampion_admin_externeByUserId(this.userAffiche.id).subscribe(
      data=>{
          this.caeList=data
          //this.msg.success("recuperation des demandes en cours reussie !")
          console.log("recuperation des demandes en cours reussie ! ",data[0])
      },err=>{
        //this.msg.error("erreur survenue lors de la recuperation des demandes en cours")
        console.log("erreur survenue lors de la recuperation des demandes en cours")
      }
    )
    this.championService.getActifsChampion_admin_externeByUserId(this.userAffiche.id).subscribe(
      data=>{
          this.caeListAcceptes=data
          //this.msg.success("recuperation des demandes acceptees reussie !")
          console.log("recuperation des demandes acceptees reussie ! ",data[0])
      },err=>{
       // this.msg.error("erreur survenue lors de la recuperation des demandes acceptees")
       console.log("erreur survenue lors de la recuperation des demandes acceptees")
      }
    )
    this.subscription1$= this.dataProvider.getAllpays().subscribe(
      data => {
        
        this.listePays=data
        console.log("exemple de pays",data[0]);
        //this.msg.info(data.length+' pays chargés');
      },
      err => {
        //this.msg.error('Erreur survenue lors du chargement des pays: '+err.error);
      })
      this.subscription2$= this.dataProvider.getAllClubs().subscribe(
        data => {
          
          this.clubs=data
          console.log("exemple de clubs",data[0]);
          //this.msg.info(data.length+' clubs chargés');
        },
        err => {
          //this.msg.error('Erreur survenue lors du chargement des  clubs: '+err.error);
        })

        this.subscriptions?.push(this.subscription1$)
        this.subscriptions?.push(this.subscription2$)
        this.subscriptions?.push(this.subscription3$)
    
  }
  
mettreajour(){
  if(this.userForm.controls["password"].value!=this.userForm.controls["checkpassword"].value){
    this.msg.error("les mots de passe sont differents")
    return 
  }
  let mdp=this.userForm.controls["changerMDP"].value
  let user=new User()
  user.id=this.userAffiche.id
  user.idMongo=this.userAffiche.idMongo
  user.password=this.userForm.controls["password"].value?this.userForm.controls["password"].value:this.userAffiche.password
  user.username=this.userForm.controls["username"].value
  user.club=this.userForm.controls["club"].value
  user.nom=this.userForm.controls["nom"].value
  user.prenom=this.userForm.controls["prenom"].value
  user.newsletter=this.userForm.controls["newsletter"].value
  user.email=this.userForm.controls["email"].value
  user.date_naissance2=this.userForm.controls["dateNaissance"].value
  user.date_naissance=this.userForm.controls["dateNaissance"].value.toString()
  user.pays=this.userForm.controls["paysID"].value
  user.code_postale=this.userForm.controls["codePostal"].value
  user.grade=this.userForm.controls["grade"].value
  user.ville=this.userForm.controls["ville"].value
  user.offres=this.userForm.controls["offres"].value
  this.auth.updateUser(user,mdp).subscribe(
    data=>{
      this.msg.success("infos mis a jour")
      console.log(user)
    },err=>{
      this.msg.error("probleme de mise a jour")
    }
  )
}

modifierChampion(id:number){
  this.router.navigate(['/membre/modifierchampion/'+id,]);
}

ngOnDestroy() {
  this.subscriptions.forEach((subscription) => subscription.unsubscribe())
}
}
