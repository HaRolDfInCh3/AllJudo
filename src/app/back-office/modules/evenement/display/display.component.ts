import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
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
  Pays:any;
  Categories:any;
  Categorieages:any;
  listOfData:any;
  listOfDisplayedData:any;
  submitForm(): void {
    console.log(this.evenementForm.value);
    this.msg.success('evenements crée avec succès !');
  }

  constructor(private fb: FormBuilder,private msg: NzMessageService,private evenementService:EvenementsService) {
    
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
      Document1: [null, [Validators.required]],
      Document2: [null, [Validators.required]],
      Document3: [null, [Validators.required]]
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
  

}
