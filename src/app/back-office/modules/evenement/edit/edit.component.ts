import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Evenement } from 'src/app/back-office/models/classes/Evenement';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id?: number;
  size: NzSelectSizeType = 'large';
  evenementForm!: FormGroup;
  categorieages: any;
  categories: any;
  currentEvent:any;
  pays: any;
  constructor(private dataProvider:ProviderService,private fb: FormBuilder,private route: ActivatedRoute,private msg: NzMessageService,private evenementService:EvenementsService) { }

  ngOnInit(): void {
    this.evenementForm = this.fb.group({
      Type: [null, [Validators.required]],
      Visible: [null, [Validators.required]],
       Intitule: [null, [Validators.required]],
       DateDebut: [null, [Validators.required]],
       DateFin: [null, [Validators.required]],
      Sexe: [null, [Validators.required]],
      Presentation: [null],
      Categorieage: [null, [Validators.required]],
      Categorie: [null, [Validators.required]],
      Pays: [null],
      Document1: [null,],
      Document2: [null, ],
      Document3: [null, ]
    });
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
  });
  this.dataProvider.getAllEvCategoriesAge().subscribe(
    data => {
      this.categorieages=data
      this.msg.info(this.categorieages.length+' categories d\'ages chargées');
    },
    err => {
      console.log("erreur survenue lors du chargement des categories d'age");
      this.msg.error("erreur survenue lors du chargement des categories d'age");
    }
  );
  this.dataProvider.getAllEvCategoriesEvenement().subscribe(
    data => {
      this.categories=data
      this.msg.info(this.categories.length+' categories d\'evenement chargées');
    },
    err => {
      console.log("erreur survenue lors du chargement des categories d'evenement");
      this.msg.error("erreur survenue lors du chargement des categories d'evenement");
    }
  );
  this.dataProvider.getAllpays().subscribe(
    data => {
      this.pays=data
      this.msg.info(this.pays.length+' pays chargées');
    },
    err => {
      console.log("erreur survenue lors du chargement des pays");
      this.msg.error("erreur survenue lors du chargement des pays");
    }
  );
  this.evenementService.getEvenement(this.id||0).subscribe(
    data => {
      console.log("ev recupere:",data)
      this.currentEvent=data
      this.evenementForm.controls['Type'].patchValue( this.currentEvent.type);
      this.evenementForm.controls['Visible'].patchValue( this.currentEvent.visible);
      this.evenementForm.controls['Intitule'].patchValue( this.currentEvent.nom);
      this.evenementForm.controls['DateDebut'].patchValue( this.currentEvent.dateDebut);
      this.evenementForm.controls['DateFin'].patchValue( this.currentEvent.dateFin);
      this.evenementForm.controls['Sexe'].patchValue( this.currentEvent.sexe);
      this.evenementForm.controls['Presentation'].patchValue( this.currentEvent.presentation);
      this.evenementForm.controls['Categorieage'].patchValue( this.currentEvent.categorieageID);
      this.evenementForm.controls['Categorie'].patchValue( this.currentEvent.categorieID);
      this.evenementForm.controls['Pays'].patchValue( this.currentEvent.pays2.id);
      console.log("evenenement charge",this.evenementForm.value);
      this.msg.info(' Evenement d\''+this.id+' chargée');
    },
    err => {
      this.msg.error('Erreur survenue lors du chargement de l\' evenement: '+err.error);
    })
  }
  updateForm(){
    const evenement=new Evenement()
    evenement.type=this.evenementForm.controls['Type'].value
    evenement.visible=this.evenementForm.controls['Visible'].value
    evenement.nom=this.evenementForm.controls['Intitule'].value
    evenement.dateDebut=this.evenementForm.controls['DateDebut'].value
    evenement.dateFin=this.evenementForm.controls['DateFin'].value
    evenement.datePub=this.currentEvent.datePub
    evenement.sexe=this.evenementForm.controls['Sexe'].value
    evenement.presentation=this.evenementForm.controls['Presentation'].value
    evenement.document1=this.evenementForm.controls['Document1'].value?this.evenementForm.controls['Document1'].value:this.currentEvent.document1
    evenement.document2=this.evenementForm.controls['Document2'].value?this.evenementForm.controls['Document2'].value:this.currentEvent.document2
    evenement.document3=this.evenementForm.controls['Document3'].value?this.evenementForm.controls['Document3'].value:this.currentEvent.document3
    evenement.categorieageID=this.evenementForm.controls['Categorieage'].value
    evenement.categorieID=this.evenementForm.controls['Categorie'].value
    evenement.paysID=this.evenementForm.controls['Pays'].value
    this.evenementService.updateEvenement(this.id||0,evenement).subscribe(
      data => {
        this.msg.success('evenements mis a jour avec succès !');
      },
      err => {
        console.log("erreur survenue lors de la mise a jour");
        this.msg.error("erreur survenue lors de la mise a jour");
      }
    );
  }

}
