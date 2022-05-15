import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { MainDirectrice } from 'src/app/back-office/models/enums/MainDirectrice';
import { ChampionsService } from 'src/app/back-office/services-backoffice/champions.service';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  maindirectices= MainDirectrice;
  listePays:any;
  clubs:any;
  currentChampion:any;
  championForm!: FormGroup;
  size: NzSelectSizeType = 'large';
  mainDirectrices() : Array<string> {
    var keys = Object.keys(this.maindirectices);
    return keys.slice(keys.length / 2);
}
  id!:number;
  listOfDisplayedResults:any
  listOfDisplayedSimilars:any
  listOfResults:any
  listOfSimilars:any
  constructor(private evenementService:EvenementsService,private dataProvider:ProviderService,private fb: FormBuilder,private router: Router,private msg: NzMessageService,private championService:ChampionsService,private evenS:EvenementsService,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
  });
    this.championForm = this.fb.group({
      nom: [null, [Validators.required]],
      sexe: [null, [Validators.required]],
      paysID: [null, [Validators.required]],
      nvPaysID: [null, ],
      dateChangementNat2: [null, [Validators.required]],
      dateNaissance2: [null,[Validators.required]],
      lieuNaissance: [null],
      grade: [null, [Validators.required]],
      clubs: [null, [Validators.required]],
      taille: [null, [Validators.required]],
      poids: [null],
      tokuiWaza: [null, ],
      mainDirectrice: [null, [Validators.required]],
      activite: [null],
      forces: [null],
      idole: [null],
      lidole: [null],
      idole2: [null],
      lidole2: [null],
      idole3: [null],
      lidole3: [null],
      idole4: [null],
      lidole4: [null],
      idole5: [null],
      lidole5: [null],
      idole6: [null],
      lidole6: [null],
      idole7: [null],
      lidole7: [null],
      anecdote:[null],
      phrase: [null],
      vuPar: [null, ],
      site: [null],
    });

    this.dataProvider.getAllpays().subscribe(
      data => {
        
        this.listePays=data
        console.log("exemple de pays",data[0]);
        this.msg.info(data.length+' pays chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des pays: '+err.error);
      })
      this.dataProvider.getAllClubs().subscribe(
        data => {
          
          this.clubs=data
          console.log("exemple de clubs",data[0]);
          this.msg.info(data.length+' clubs chargés');
        },
        err => {
          this.msg.error('Erreur survenue lors du chargement des  clubs: '+err.error);
        })
        this.evenementService.getChampionResults(this.id).subscribe(
          data => {
            this.listOfDisplayedResults=data
            this.listOfResults=data
            console.log("exemple de resultat ",data[0]);
            this.msg.info(data.length+' resultats chargés');
          },
          err => {
            this.msg.error('Erreur survenue lors du chargement des resultats: '+err.error);
          })
          this.championService.getChampions(this.id||0).subscribe(
            data => {
              this.currentChampion=data
              this.championForm.controls['nom'].patchValue( this.currentChampion.nom);
              this.championForm.controls['sexe'].patchValue( this.currentChampion.sexe);
              this.championForm.controls['paysID'].patchValue( this.currentChampion.paysID);
              this.championForm.controls['nvPaysID'].patchValue( this.currentChampion.nvPaysID);
              this.championForm.controls['dateChangementNat2'].patchValue( this.currentChampion.dateChangementNat);
              this.championForm.controls['dateNaissance2'].patchValue( this.currentChampion.dateNaissance);
              this.championForm.controls['lieuNaissance'].patchValue( this.currentChampion.lieuNaissance);
              this.championForm.controls['grade'].patchValue( this.currentChampion.grade);
              this.championForm.controls['mainDirectrice'].patchValue( this.currentChampion.mainDirectrice);
              this.championForm.controls['clubs'].patchValue( this.currentChampion.clubs);
              this.championForm.controls['taille'].patchValue( this.currentChampion.taille);
              this.championForm.controls['poids'].patchValue( this.currentChampion.poids);
              this.championForm.controls['tokuiWaza'].patchValue( this.currentChampion.tokuiWaza);
              this.championForm.controls['activite'].patchValue( this.currentChampion.activite);
              this.championForm.controls['forces'].patchValue( this.currentChampion.forces);
              this.championForm.controls['idole'].patchValue( this.currentChampion.idole);
              this.championForm.controls['lidole'].patchValue( this.currentChampion.lidole);
              this.championForm.controls['idole2'].patchValue( this.currentChampion.idole2);
              this.championForm.controls['lidole2'].patchValue( this.currentChampion.lidole2);
              this.championForm.controls['idole3'].patchValue( this.currentChampion.idole3);
              this.championForm.controls['lidole3'].patchValue( this.currentChampion.lidole3);
              this.championForm.controls['idole4'].patchValue( this.currentChampion.idole4);
              this.championForm.controls['lidole4'].patchValue( this.currentChampion.lidole4);
              this.championForm.controls['idole5'].patchValue( this.currentChampion.idole5);
              this.championForm.controls['lidole5'].patchValue( this.currentChampion.lidole5);
              this.championForm.controls['idole7'].patchValue( this.currentChampion.idole7);
              this.championForm.controls['lidole7'].patchValue( this.currentChampion.lidole7);
              this.championForm.controls['idole6'].patchValue( this.currentChampion.idole6);
              this.championForm.controls['lidole6'].patchValue( this.currentChampion.lidole6);
              this.championForm.controls['anecdote'].patchValue( this.currentChampion.anecdote);
              this.championForm.controls['phrase'].patchValue( this.currentChampion.phrase);
              this.championForm.controls['vuPar'].patchValue( this.currentChampion.vuPar);
              this.championForm.controls['site'].patchValue( this.currentChampion.site);
              console.log(' champion chargé',this.championForm.value)
              this.msg.info(' champion chargé',this.championForm.value);
            },
            err => {
              console.log("erreur survenue lors du chargement du champion");
              this.msg.error("erreur survenue lors du chargement du champion");
            }
          );
          this.championService.getChampionSimilaires(this.id).subscribe(
            data => {
              this.listOfDisplayedSimilars=data
              this.listOfSimilars=data
              if(data.length>0){
                console.log("exemple de doublon ",data[0]);
              this.msg.info(data.length+' doublons trouvés');
              }
              this.msg.info(' pas de doublons trouvés');
            },
            err => {
              this.msg.error('Erreur survenue lors de la detection des doublons: '+err.error);
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
    this.listOfDisplayedResults = this.listOfResults.filter((item: any) => item.titre.indexOf(this.searchValue) !== -1);
  }
  
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any;
  setOfCheckedId = new Set<number>();
  searchValue2 = '';
  visible2 = false;
  reset2(): void {
    this.searchValue2 = '';
    this.search2();
  }

  search2(): void {
    this.visible2 = false;
    this.listOfDisplayedSimilars = this.listOfSimilars.filter((item: any) => item.titre.indexOf(this.searchValue2) !== -1);
  }
  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
  }
  delete(id:number){
    this.championService.delete(id).subscribe(
      data => {
        this.msg.success(' supression du champion doublon d\'id: '+id);
        this.listOfDisplayedSimilars = this.listOfSimilars.filter((item: any) => item.id !==id);
        this.listOfSimilars = this.listOfSimilars.filter((item: any) => item.id !==id);

      },
      err => {
        this.msg.error('Erreur survenue lors de la supression : '+err.error);
      })
  }
  edit(id:number){
    this.router.navigate(['edit/'+id],{relativeTo:this.route});
  }

  submitForm(){

  }

}
