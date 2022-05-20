import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ChampionsService } from 'src/app/back-office/services-backoffice/champions.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  //par pas
  listOfDisplayedSimilars1: any;
  listOfSimilars1: any;
  //par intervales
  listOfDisplayedSimilars2: any;
  listOfSimilars2: any;

  int_debut?:number
  int_fin?:number
  //pour une recherche par pas
  pas_valeur?:number //la valeur du pas
  pas_valeur_reprise?:number //la valeur de reprise
  pas_valeur_position_courrante:number=0  //la position courrante pour faire des recherches successives
  pas_valeur_deb?:number 
  pas_valeur_fin?:number
  pas:any
  constructor(private dataProvider:ProviderService,private fb: FormBuilder,private router: Router,private msg: NzMessageService,private championService:ChampionsService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pas = [5,10,20,30,50,100,200];

  }
  pas_valide():boolean{
    if(this.pas_valeur ){
      return false
    }
    return true
  }
  pas_valide2():boolean{
    if(this.int_debut && this.int_fin ){
      return false
    }
    return true
  }

  getDoublonsPas(){
    if(this.listOfDisplayedSimilars1){
      this.listOfDisplayedSimilars1.length=0
     this.listOfSimilars1.length=0
    }
    
    this.pas_valeur_deb=(this.pas_valeur_reprise||0)+this.pas_valeur_position_courrante
    this.pas_valeur_fin=this.pas_valeur_deb+(this.pas_valeur||0)
    this.championService.getChampionSimilaires_Deb_Fin(this.pas_valeur_deb,this.pas_valeur_fin).subscribe(
      data => {
        this.listOfDisplayedSimilars1=data
        this.listOfSimilars1=data
        if(data.length>0){
          console.log("exemple de doublon ",data[0]);
        this.msg.info(data.length+' doublons trouvés');
        }else{
          this.msg.info(' pas de doublons trouvés');
        }
        
      },
      err => {
        this.msg.error('Erreur survenue lors de la detection des doublons: '+err.error);
      })
      //mettre valeur de reprise a zero pour les autres itterations
      //mettre position courrante a la valeur finale
      this.pas_valeur_reprise=0
      this.pas_valeur_position_courrante=this.pas_valeur_fin
  }

  getDoublonsIntervalle(){
    this.championService.getChampionSimilaires_Deb_Fin(this.int_debut||0,this.int_fin||0).subscribe(
      data => {
        this.listOfDisplayedSimilars2=data
        this.listOfSimilars2=data
        if(data.length>0){
          console.log("exemple de doublon ",data[0]);
        this.msg.info(data.length+' doublons trouvés');
        }else{
          this.msg.info(' pas de doublons trouvés');
        }
        
      },
      err => {
        this.msg.error('Erreur survenue lors de la detection des doublons: '+err.error);
      })
      }
//filtre ballayage par pas
      
  searchValue = '';
  visible = false;
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayedSimilars1 = this.listOfSimilars1.filter((item: any) => item.champion.nom.indexOf(this.searchValue) !== -1);
  }
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any;
  setOfCheckedId = new Set<number>();
  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
  }

  //filtre ballayage par intervalles
  searchValue2 = '';
  visible2 = false;
  reset2(): void {
    this.searchValue2 = '';
    this.search2();
  }

  search2(): void {
    this.visible2 = false;
    this.listOfDisplayedSimilars2 = this.listOfSimilars2.filter((item: any) => item.titre.indexOf(this.searchValue2) !== -1);
  }
  checked2 = false;
  indeterminate2 = false;
  listOfCurrentPageData2: any;
  setOfCheckedId2 = new Set<number>();
  onCurrentPageDataChange2($event: any): void {
    this.listOfCurrentPageData2 = $event;
  }
}
