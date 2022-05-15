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
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  maindirectices= MainDirectrice;
  listePays:any;
  clubs:any;
  championForm!: FormGroup;
  size: NzSelectSizeType = 'large';
  listOfDisplayedData:any;
  listOfData: any;
  mainDirectrices() : Array<string> {
    var keys = Object.keys(this.maindirectices);
    return keys.slice(keys.length / 2);
}
constructor(private dataProvider:ProviderService,private fb: FormBuilder,private router: Router,private msg: NzMessageService,private championService:ChampionsService,private evenS:EvenementsService,private route: ActivatedRoute) {
}

  ngOnInit(): void {
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
      idole1: [null],
      lidole1: [null],
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
        this.championService.getAllChampionsByNameStart("A").subscribe(
          data => {
            this.listOfData=data
            this.listOfDisplayedData=data
            console.log("exemple de champion",data[0]);
            this.msg.info(data.length+' champions chargés');
          },
          err => {
            this.msg.error('Erreur survenue lors du chargement des champions: '+err.error);
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
    this.listOfDisplayedData = this.listOfData.filter((item: any) => item.titre.indexOf(this.searchValue) !== -1);
  }
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any;
  setOfCheckedId = new Set<number>();
  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
  }
  delete(id:number){
    this.championService.delete(id).subscribe(
      data => {
        this.msg.success(' supression du champion d\'id: '+id);
        this.listOfDisplayedData = this.listOfData.filter((item: any) => item.id !==id);
        this.listOfData = this.listOfData.filter((item: any) => item.id !==id);

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
