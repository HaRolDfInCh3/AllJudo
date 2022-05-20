import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Sous_categorie } from 'src/app/back-office/models/classes/Sous_categorie';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  size: NzSelectSizeType = 'large';
  listOfDisplayedData: any;
  listOfData: any;
  listOfCategories:any
  sous_categorieForm!: FormGroup;
  constructor(private dataProvider:ProviderService,private fb: FormBuilder,private ecritService:EcritureService,private msg: NzMessageService) { }


  ngOnInit(): void {
    this.sous_categorieForm = this.fb.group({
      nom_sous_categorie: [null, [Validators.required]],
      categorie_ID: [null, [Validators.required]],
    });
    this.dataProvider.getAllCategories().subscribe(
      data => {
        
        this.listOfCategories=data
        console.log("exemple de categorie",data[0]);
        this.msg.info(data.length+' categories chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des categories: '+err.error);
      })
    this.dataProvider.getAllSous_categories().subscribe(
      data => {
        
        this.listOfData=data
        this.listOfDisplayedData=data
        console.log("exemple de sous_categorie",data[0]);
        this.msg.info(data.length+' sous_categories chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des sous_categories: '+err.error);
      })
  }

  delete(id:number){
    this.ecritService.deleteSous_categorie(id||0).subscribe(
      data => {
        this.msg.success('sous_categorie supprimee');
        
        this.listOfDisplayedData = this.listOfData.filter((item: any) => item.id !==id);
        this.listOfData = this.listOfData.filter((item: any) => item.id !==id);
      },
      err => {
        this.msg.error('Erreur survenue lors de la supression de la sous_categorie: '+err.error);
      })
  }


  //-------------- filtre

  searchValue = '';
visible = false;
reset(): void {
this.searchValue = '';
this.search();
}

search(): void {
this.visible = false;
this.listOfDisplayedData = this.listOfData.filter((item: any) => item.nom_sous_categorie.indexOf(this.searchValue) !== -1);
}
onCurrentPageDataChange($event: any): void {
this.listOfCurrentPageData = $event;
}

checked = false;
indeterminate = false;
listOfCurrentPageData: any;
setOfCheckedId = new Set<number>();


submitForm(){
  const sous_categorie=new Sous_categorie()  
  
  sous_categorie.nom_sous_categorie=this.sous_categorieForm.controls["nom_sous_categorie"].value
  sous_categorie.categorie_ID=this.sous_categorieForm.controls["categorie_ID"].value

  console.log(sous_categorie)
  this.ecritService.addSousCategorie(sous_categorie).subscribe(
    data => {
      this.msg.success(' sous_categorie ajoutee');
      console.log("recu :",data)
      this.listOfData = [data].concat(this.listOfData)
      this.listOfDisplayedData = [data].concat(this.listOfDisplayedData)
    },
    err => {
      this.msg.error('Erreur survenue lors de l\'ajout de ls sous_categorie: '+err.error);
    })
}

}
