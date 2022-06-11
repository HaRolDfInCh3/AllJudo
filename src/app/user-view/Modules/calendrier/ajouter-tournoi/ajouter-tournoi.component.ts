import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Evenement } from 'src/app/back-office/models/classes/Evenement';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
@Component({
  selector: 'app-ajouter-tournoi',
  templateUrl: './ajouter-tournoi.component.html',
  styleUrls: ['./ajouter-tournoi.component.css']
})
export class AjouterTournoiComponent implements OnInit {

  size: NzSelectSizeType = 'large';
  evenementForm!: FormGroup;
  categorieages: any;
  categories: any;
  pays: any;
  constructor(private dataProvider:ProviderService,private fb: FormBuilder,private route: ActivatedRoute,private msg: NzMessageService,private evenementService:EvenementsService) { }

  ngOnInit(): void {
    this.evenementForm = this.fb.group({
      Type: [null, [Validators.required]],
       Intitule: [null, [Validators.required]],
       DateDebut: [null, [Validators.required]],
       DateFin: [null, [Validators.required]],
      Sexe: [null, [Validators.required]],
      Presentation: [null],
      Categorieage: [null, [Validators.required]],
      Categorie: [null, [Validators.required]],
      Contact:[null, ],
      Mail:[null, ],
      Telephone:[null, ],
      Web:[null, ],
      Pays: [null],
      Document1: [null,],
      Document2: [null, ],
      Document3: [null, ]
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
  
  }
  addEvent(){
    const evenement=new Evenement()
    evenement.type=this.evenementForm.controls['Type'].value
    evenement.contact=this.evenementForm.controls['Contact'].value
    evenement.mail=this.evenementForm.controls['Mail'].value
    evenement.telephone=this.evenementForm.controls['Telephone'].value
    evenement.web=this.evenementForm.controls['Web'].value
    evenement.nom=this.evenementForm.controls['Intitule'].value
    evenement.dateDebut=this.evenementForm.controls['DateDebut'].value
    evenement.dateFin=this.evenementForm.controls['DateFin'].value
    evenement.datePub=new Date()
    evenement.sexe=this.evenementForm.controls['Sexe'].value
    evenement.presentation=this.evenementForm.controls['Presentation'].value
    evenement.document1=this.evenementForm.controls['Document1'].value
    evenement.categorieageID=this.evenementForm.controls['Categorieage'].value
    evenement.categorieID=this.evenementForm.controls['Categorie'].value
    evenement.paysID=this.evenementForm.controls['Pays'].value
    this.evenementService.addEvenement(evenement).subscribe(
      data => {
        this.msg.success('evenements ajoué avec succès !');
      },
      err => {
        console.log("erreur survenue lors de l'ajout");
        this.msg.error("erreur survenue lors de l'ajout");
      }
    );
  }

}

