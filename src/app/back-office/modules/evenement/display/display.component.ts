import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Evenement } from 'src/app/back-office/models/classes/Evenement';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import {EvenementsService} from '../../../services-backoffice/evenements.service'
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  evenementForm!: FormGroup;
  types: Array<{ label: string; value: string }> = [];
  evenements: Array<{ label: string; value: string }> = [];
  size: NzSelectSizeType = 'large';
  pays:any;
  categories:any;
  categorieages:any;
  listOfData:any;
  listOfDisplayedData:any;
  submitForm(): void {
    console.log(this.evenementForm.value);
    const evenement=new Evenement()
    evenement.type=this.evenementForm.controls['Type'].value
    evenement.visible=this.evenementForm.controls['Visible'].value
    evenement.nom=this.evenementForm.controls['Intitule'].value
    evenement.dateDebut=this.evenementForm.controls['DateDebut'].value
    evenement.dateFin=this.evenementForm.controls['DateFin'].value
    evenement.datePub=new Date()
    evenement.sexe=this.evenementForm.controls['Sexe'].value
    evenement.presentation=this.evenementForm.controls['Presentation'].value
    evenement.document1=this.evenementForm.controls['Document1'].value
    evenement.document2=this.evenementForm.controls['Document2'].value
    evenement.document3=this.evenementForm.controls['Document3'].value
    evenement.categorieageID=this.evenementForm.controls['Categorieage'].value
    evenement.categorieID=this.evenementForm.controls['Categorie'].value
    evenement.paysID=this.evenementForm.controls['Pays'].value
    this.evenementService.addEvenement(evenement).subscribe(
      data => {
        this.msg.success('evenements crée avec succès !');
      },
      err => {
        console.log("erreur survenue lors de l'ajout");
        this.msg.error("erreur survenue lors de l'ajout");
      }
    );
    
    
  }

  constructor(private dataProvider:ProviderService,private router: Router,private route:ActivatedRoute,private fb: FormBuilder,private msg: NzMessageService,private evenementService:EvenementsService) {
    
  }

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
    this.evenementService.getAllEvenements().subscribe(
      data => {
        
        this.listOfData=data
        this.listOfDisplayedData=data
        console.log("exemple de evenements",data[0]);
        this.msg.info(data.length+' evenements chargées');
      },
      err => {
        this.msg.error('Erreur survenue: '+err.error);
      })
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
  searchValue = '';
  visible = false;
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayedData = this.listOfData.filter((item: any) => item.nom.indexOf(this.searchValue) !== -1);
  }
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any;
  setOfCheckedId = new Set<number>();
  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
  }

  add(id:number){
    this.router.navigate(['add/'+id],{relativeTo:this.route});
  }
  edit(id:number){
    this.router.navigate(['edit/'+id],{relativeTo:this.route});
  }

  delete(id:number){
    this.evenementService.delete(id).subscribe(
      data => {
        this.msg.success(' supression de la evenement d\'id: '+id);
        this.listOfDisplayedData = this.listOfData.filter((item: any) => item.id !==id);
        this.listOfData = this.listOfData.filter((item: any) => item.id !==id);

      },
      err => {
        this.msg.error('Erreur survenue lors de la supression : '+err.error);
      })
  }
  

}
