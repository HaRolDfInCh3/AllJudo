import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Champion } from 'src/app/back-office/models/classes/Champion';
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
  lettres:any=["","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
lettre_index=1
  championForm!: FormGroup;
  size: NzSelectSizeType = 'large';
  listOfDisplayedData:any;
  listOfData: any;
  mainDirectrices() : Array<string> {
    var keys = Object.keys(this.maindirectices);
    return keys.slice(keys.length / 2);
}
constructor(private dataProvider:ProviderService,private fb: FormBuilder,private router: Router,private msg: NzMessageService,private championService:ChampionsService,private route: ActivatedRoute) {
}

  ngOnInit(): void {
    this.championForm = this.fb.group({
      nom: [null, [Validators.required]],
      sexe: [null, [Validators.required]],
      paysID: [null, [Validators.required]],
      nvPaysID: [null, ],
      dateChangementNat2: [null, ],
      dateNaissance2: [null,[Validators.required]],
      lieuNaissance: [null],
      grade: [null, [Validators.required]],
      clubs: [null, [Validators.required]],
      taille: [null, [Validators.required]],
      poids: [null,[Validators.required]],
      tokuiWaza: [null, ],
      mainDirectrice: [null, [Validators.required]],
      activite: [null],
      forces: [null],
      idole: [null],
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
    this.listOfDisplayedData = this.listOfData.filter((item: any) => item.nom.indexOf(this.searchValue) !== -1);
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
    const champion=new Champion()
    champion.nom=this.championForm.controls['nom'].value
    champion.sexe=this.championForm.controls['sexe'].value
    champion.paysID=this.championForm.controls['paysID'].value
    champion.nvPaysID=this.championForm.controls['nvPaysID'].value
    champion.dateChangementNat2=this.championForm.controls['dateChangementNat2'].value
    champion.dateNaissance2=this.championForm.controls['dateNaissance2'].value
    champion.lieuNaissance=this.championForm.controls['lieuNaissance'].value
    champion.grade=this.championForm.controls['grade'].value
    champion.clubs=this.championForm.controls['clubs'].value
    champion.taille=this.championForm.controls['taille'].value
    champion.tokuiWaza=this.championForm.controls['tokuiWaza'].value
    champion.mainDirectrice=this.championForm.controls['mainDirectrice'].value
    champion.activite=this.championForm.controls['activite'].value
    champion.forces=this.championForm.controls['forces'].value
    champion.anecdote=this.championForm.controls['anecdote'].value
    champion.phrase=this.championForm.controls['phrase'].value
    champion.vuPar=this.championForm.controls['vuPar'].value
    champion.idole=this.championForm.controls['idole'].value
    champion.idole2=this.championForm.controls['idole2'].value
    champion.lidole2=this.championForm.controls['lidole2'].value
    champion.idole3=this.championForm.controls['idole3'].value
    champion.lidole3=this.championForm.controls['lidole3'].value
    champion.idole4=this.championForm.controls['idole4'].value
    champion.lidole4=this.championForm.controls['lidole4'].value
    champion.idole5=this.championForm.controls['idole5'].value
    champion.lidole5=this.championForm.controls['lidole5'].value
    champion.idole6=this.championForm.controls['idole6'].value
    champion.lidole6=this.championForm.controls['lidole6'].value
    champion.idole7=this.championForm.controls['idole7'].value
    champion.lidole7=this.championForm.controls['lidole7'].value
    champion.site=this.championForm.controls['site'].value
    console.log("champion: ",champion)
    this.championService.addChampion(champion).subscribe(
      data => {
        this.msg.success(' ajout du champion reussi');

      },
      err => {
        this.msg.error('Erreur survenue lors de l\'ajout du champion : '+err.error);
      })
  }
  changerLettre(index:number){
    let lettre=this.lettres[index]
    this.msg.info("champions commencant par "+lettre+" en cours de recuperation")
    this.championService.getAllChampionsByNameStartAsc(lettre,true).subscribe(
      
      data => {
      
       this.listOfData=data;
       this.listOfDisplayedData=data;
       this.msg.success("champions commencant par "+lettre+" recuperes !")
       console.log("champions commencant par "+lettre,this.listOfDisplayedData[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des champions commencant par "+lettre)
        console.log("erreur survenue lors de la recuperation des champions commencant par "+lettre);
      }
    );
  }
}
