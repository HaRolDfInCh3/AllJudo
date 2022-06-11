import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { ChampionsService } from 'src/app/back-office/services-backoffice/champions.service';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { StockageJwtService } from 'src/app/back-office/services-backoffice/stockage-jwt.service';
import { Champion_admin_externe } from 'src/app/user-view/Models/classes/Champion_admin_externe';
import { SituationAdminExterne } from 'src/app/user-view/Models/enums/SituationAdminExterne';
import { PublicitesService } from 'src/app/user-view/services/publicites.service';

@Component({
  selector: 'app-demande-admin',
  templateUrl: './demande-admin.component.html',
  styleUrls: ['./demande-admin.component.css']
})
export class DemandeAdminComponent implements OnInit {
  id?:number
  size: NzSelectSizeType = 'large';
  url?:string
  championAffiche:any//ce qui est a l'ecran
  lienspubs?:string
  situationAE= SituationAdminExterne;  
  demandeForm!: FormGroup;
  situations() : Array<string> {
    var keys = Object.keys(this.situationAE);
    return keys.slice(keys.length / 2);
}
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private stockage:StockageJwtService,private eventService:EvenementsService,private championService:ChampionsService,private pubService:PublicitesService,private router: Router,private msg: NzMessageService,private dataProvider:ProviderService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
      
  });
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
    this.demandeForm = this.fb.group({
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      telephone: [null],
      situation: [null, [Validators.required] ],
      
    });
  }
  envoyer(){
    if(!this.stockage.getUserNormal()){
      this.msg.info("veuillez vous authentifier")
    }else{
      let cae=new Champion_admin_externe();
      let user=this.stockage.getUserNormalDetails()
      cae.actif=false
      cae.champion_id=this.championAffiche.id
      cae.user_id=user.id
      cae.date_creation2=new Date()
      cae.date_mod2=new Date()
      cae.telephone=this.demandeForm.controls["telephone"].value
      cae.nom=this.demandeForm.controls["nom"].value
      cae.prenom=this.demandeForm.controls["prenom"].value
      cae.situation=this.demandeForm.controls["situation"].value
      console.log("champion admin externe ",cae)
      this.championService.addChampion_admin_externe(cae).subscribe(
        data=>{
          this.msg.success("demande envoyee!")
        },err=>{
          this.msg.error("impossible")
        }
      )
    }
  }

}
