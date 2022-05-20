import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Annonce } from 'src/app/back-office/models/classes/Annonce';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  annonceForm!: FormGroup;
  id?:number
  size: NzSelectSizeType = 'large';
  currentAnnonce:any
  listeSouscategories:any
  listePays:any
  constructor(private route: ActivatedRoute,private router: Router,private dataProvider:ProviderService,private fb: FormBuilder,private ecritService:EcritureService,private msg: NzMessageService) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
  });
  this.annonceForm = this.fb.group({
    sous_categorie_ID: [null, [Validators.required]],
    descriptif: [null, [Validators.required]],
    titre: [null,[Validators.required]],
    mail: [null, [Validators.required]],
    nom: [null,[Validators.required] ],
    code_postal: [null, ],
    valide: [null, ],
    premium: [null, ],
    ville: [null, [Validators.required]],
    pays: [null,[Validators.required] ],
    telephone: [null, ],
  });
  this.dataProvider.getAllSous_categories().subscribe(
    data => {
      
      this.listeSouscategories=data
      console.log("exemple de sous categorie",data[0]);
      this.msg.info(data.length+' sous categories chargés');
    },
    err => {
      this.msg.error('Erreur survenue lors du chargement des sous categories: '+err.error);
    })

    this.dataProvider.getAllpays().subscribe(
      data => {
        
        this.listePays=data
        console.log("exemple de pays",data[0]);
        this.msg.info(data.length+' pays chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des pays: '+err.error);
      })

  this.dataProvider.getAnnonce(this.id||0).subscribe(
    data => {
      this.msg.success(' annonce recuperee');
      console.log("recu :",data)
      this.currentAnnonce=data
      this.annonceForm.controls["titre"].patchValue(data.titre)
      this.annonceForm.controls["descriptif"].patchValue(data.descriptif)
      this.annonceForm.controls["nom"].patchValue(data.nom)
      this.annonceForm.controls["mail"].patchValue(data.mail)
      this.annonceForm.controls["valide"].patchValue(data.valide)
      this.annonceForm.controls["premium"].patchValue(data.premium)
      this.annonceForm.controls["telephone"].patchValue(data.telephone)
      this.annonceForm.controls["code_postal"].patchValue(data.code_postal)
      this.annonceForm.controls["ville"].patchValue(data.ville)
      this.annonceForm.controls["pays"].patchValue(data.pays)
      this.annonceForm.controls["sous_categorie_ID"].patchValue(data.sous_categorie_ID)
    },
    err => {
      this.msg.error('Erreur survenue lors de la recuperation de l annonce: '+err.error);
    })

  }


  submitForm(){
    const USER_KEY = 'utilisateur';
    const userString = JSON.parse(window.sessionStorage.getItem(USER_KEY)||"") ;
    let user = JSON.parse(userString);
    const annonce=new Annonce()
    annonce.date_modification=new Date()
    annonce.id=this.currentAnnonce.id
    annonce.date_publication=this.currentAnnonce.date_publication
    annonce.descriptif=this.annonceForm.controls["descriptif"].value
    annonce.telephone=this.annonceForm.controls["telephone"].value
    annonce.titre=this.annonceForm.controls["titre"].value
    annonce.nom=this.annonceForm.controls["nom"].value
    annonce.code_postal=this.annonceForm.controls["code_postal"].value
    annonce.ville=this.annonceForm.controls["ville"].value
    annonce.valide=this.annonceForm.controls["valide"].value||this.currentAnnonce.valide
    annonce.login=user.userName
    annonce.premium=this.annonceForm.controls["premium"].value||this.currentAnnonce.premium
    annonce.sous_categorie_ID=this.annonceForm.controls["sous_categorie_ID"].value
    //annonce.user_ID=this.annonceForm.controls["user_ID"].value
    annonce.idMongo=this.currentAnnonce.idMongo
    annonce.pays=this.annonceForm.controls["pays"].value
    console.log(annonce)
    this.ecritService.updateAnnonce(this.id||0,annonce).subscribe(
      data => {
        this.msg.success('annonce mise a jour');
        console.log("recu :",data)
      },
      err => {
        this.msg.error('Erreur survenue lors de la mise a jour de l annonce: '+err.error);
      })
  }


}
