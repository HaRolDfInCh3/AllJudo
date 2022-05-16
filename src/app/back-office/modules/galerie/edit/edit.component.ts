import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Galerie } from 'src/app/back-office/models/classes/Galerie';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  listeEvents: any;
  currentGalerie: any;
  size: NzSelectSizeType = 'large';
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private router: Router,private dataProvider:ProviderService,private ecritService:EcritureService,private msg: NzMessageService) { }
id?:number;
galerieForm!: FormGroup;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
  });

  this.galerieForm = this.fb.group({
    titre: [null, [Validators.required]],
    titre_en: [null, ],
    date: [null, [Validators.required]],
    photographe: [null, ],
    evenement_id: [null,[Validators.required]],
    admin: [null],
    lien: [null],
    
  });

  this.dataProvider.getAllEvenements().subscribe(
    data => {
      
      this.listeEvents=data
      console.log("exemple d'evenement",data[0]);
      this.msg.info(data.length+' evenements chargés');
    },
    err => {
      this.msg.error('Erreur survenue lors du chargement des evenements: '+err.error);
    })
    this.dataProvider.getGalerie(this.id||0).subscribe(
      data => {
        
        this.currentGalerie=data
        this.galerieForm.controls['titre'].patchValue( this.currentGalerie.titre);
        this.galerieForm.controls['titre_en'].patchValue( this.currentGalerie.titre_en);
        this.galerieForm.controls['date'].patchValue( this.currentGalerie.date);
        this.galerieForm.controls['photographe'].patchValue( this.currentGalerie.photographe);
        this.galerieForm.controls['evenement_id'].patchValue( this.currentGalerie.evenement_id);
        this.galerieForm.controls['admin'].patchValue( this.currentGalerie.admin);
        this.galerieForm.controls['lien'].patchValue( this.currentGalerie.lien);
        console.log("galerie chargee",data);
        this.msg.info('galerie chargée');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement de la galerie: '+err.error);
      })
    
  }
updateForm(){
    const USER_KEY = 'utilisateur';
      const userString = JSON.parse(window.sessionStorage.getItem(USER_KEY)||"") ;
      let user = JSON.parse(userString);
    const galerie=new Galerie()
    galerie.id=this.id
    galerie.titre=this.galerieForm.controls['titre'].value
    galerie.titre_en=this.galerieForm.controls['titre_en'].value
    galerie.date=this.galerieForm.controls['date'].value
    galerie.photographe=this.galerieForm.controls['photographe'].value
    galerie.evenement_id=this.galerieForm.controls['evenement_id'].value
    galerie.lien=this.galerieForm.controls['lien'].value
    galerie.admin=user.userName
    console.log(galerie)
    this.ecritService.updateGalerie(this.id||0,galerie).subscribe(
      data => {
        this.msg.success('galerie mise a jour ');
      },
      err => {
        this.msg.error('Erreur survenue lors de la mise a jour de la galerie: '+err.error);
      })
  }

}
