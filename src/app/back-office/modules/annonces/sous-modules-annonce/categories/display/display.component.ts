import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Categorie } from './../../../../../models/classes/Categorie';
import { EcritureService } from './../../../../../services-backoffice/ecriture.service';
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
  categorieForm!: FormGroup;
  constructor(private dataProvider:ProviderService,private fb: FormBuilder,private ecritService:EcritureService,private msg: NzMessageService) { }


  ngOnInit(): void {
    this.categorieForm = this.fb.group({
      nom_categorie: [null, [Validators.required]],
    });
    this.dataProvider.getAllCategories().subscribe(
      data => {
        
        this.listOfData=data
        this.listOfDisplayedData=data
        console.log("exemple de categorie",data[0]);
        this.msg.info(data.length+' categories chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des categories: '+err.error);
      })
  }

  delete(id:number){
    this.ecritService.deleteCategorie(id||0).subscribe(
      data => {
        this.msg.success('categorie supprimee');
        
        this.listOfDisplayedData = this.listOfData.filter((item: any) => item.id !==id);
        this.listOfData = this.listOfData.filter((item: any) => item.id !==id);
      },
      err => {
        this.msg.error('Erreur survenue lors de la supression de la categorie: '+err.error);
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
this.listOfDisplayedData = this.listOfData.filter((item: any) => item.nom_categorie.indexOf(this.searchValue) !== -1);
}
onCurrentPageDataChange($event: any): void {
this.listOfCurrentPageData = $event;
}

checked = false;
indeterminate = false;
listOfCurrentPageData: any;
setOfCheckedId = new Set<number>();


submitForm(){
  const categorie=new Categorie()  
  
  categorie.nom_categorie=this.categorieForm.controls["nom_categorie"].value
  
  console.log(categorie)
  this.ecritService.AddCategorie(categorie).subscribe(
    data => {
      this.msg.success(' Categorie ajoutee');
      console.log("recu :",data)
      this.listOfData = [data].concat(this.listOfData)
      this.listOfDisplayedData = [data].concat(this.listOfDisplayedData)
    },
    err => {
      this.msg.error('Erreur survenue lors de l\'ajout de ls Categorie: '+err.error);
    })
}

}
