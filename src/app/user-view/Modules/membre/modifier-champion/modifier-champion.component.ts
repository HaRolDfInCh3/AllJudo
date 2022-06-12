import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Champion } from 'src/app/back-office/models/classes/Champion';
import { MainDirectrice } from 'src/app/back-office/models/enums/MainDirectrice';
import { ChampionsService } from 'src/app/back-office/services-backoffice/champions.service';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { StockageJwtService } from 'src/app/back-office/services-backoffice/stockage-jwt.service';
import { AuthentificationService } from 'src/app/user-view/services/authentification.service';
import { PublicitesService } from 'src/app/user-view/services/publicites.service';
import {formatDate} from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modifier-champion',
  templateUrl: './modifier-champion.component.html',
  styleUrls: ['./modifier-champion.component.css']
})
export class ModifierChampionComponent implements OnInit {
  subscription1$?: Subscription 
    subscription2$?: Subscription 
    subscription3$?: Subscription 
    subscriptions: Subscription[] = []
  size: NzSelectSizeType = 'large';
  url?:string
  userAffiche:any//ce qui est a l'ecran
  lienspubs?:string
  //recuperation
  maindirectices= MainDirectrice;
  listePays:any;
  clubs:any;
  currentChampion:any;
  championForm!: FormGroup;
  mainDirectrices() : Array<string> {
    var keys = Object.keys(this.maindirectices);
    return keys.slice(keys.length / 2);
}
  id!:number;
  listOfDisplayedResults:any
  listOfDisplayedSimilars:any
  listOfResults:any
  constructor(@Inject(LOCALE_ID) private locale: string,private stockage:StockageJwtService,private auth:AuthentificationService,private fb: FormBuilder,private championService:ChampionsService,private route: ActivatedRoute,private eventService:EvenementsService,private pubService:PublicitesService,private router: Router,private msg: NzMessageService,private dataProvider:ProviderService) { }

  ngOnInit(): void {
    this.lienspubs=this.dataProvider.getLiensPubs()
    this.subscription3$=this.pubService.getRandomBanniere_par_taille("300x250").subscribe(
      data => {
        console.log(data)
        if(data.image){
          this.url=this.lienspubs+data.image
        }
        
      },
      err => {
        //this.msg.error("erreur survenue lors de la recuperation de la banniere")
        console.log("erreur survenue lors de la recuperation de la banniere");
      }
    );
    
    this.userAffiche=this.stockage.getUserNormalDetails();
    //populer les donnees
    console.log(this.userAffiche)

 //donnees chamion
 this.route.params.subscribe(params => {
  this.id = parseInt(params["id"]);
});
this.championForm = this.fb.group({
  nom: [null, [Validators.required]],
  sexe: [null, [Validators.required]],
  paysID: [null, [Validators.required]],
  nvPaysID: [null, ],
  dateChangementNat2: [null, ],
  dateNaissance2: [null,[Validators.required]],
  lieuNaissance: [null ,[Validators.required]],
  grade: [null, [Validators.required]],
  clubs: [null, [Validators.required]],
  taille: [null, [Validators.required]],
  poids: [null ,[Validators.required]],
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
this.subscription2$= this.dataProvider.getAllpays().subscribe(
  data => {
    
    this.listePays=data
    console.log("exemple de pays",data[0]);
    //this.msg.info(data.length+' pays chargés');
  },
  err => {
   // this.msg.error('Erreur survenue lors du chargement des pays: '+err.error);
  })
  this.subscription1$=this.dataProvider.getAllClubs().subscribe(
    data => {
      
      this.clubs=data
      console.log("exemple de clubs",data[0]);
      //this.msg.info(data.length+' clubs chargés');
    },
    err => {
     // this.msg.error('Erreur survenue lors du chargement des  clubs: '+err.error);
    })
    this.eventService.getChampionResults(this.id).subscribe(
      data => {
        this.listOfDisplayedResults=data
        this.listOfResults=data
        console.log("exemple de resultat ",data[0]);
        //this.msg.info(data.length+' resultats chargés');
      },
      err => {
        if(err.status==404){
          this.msg.info('pas de resultats pour ce champion !');
        }else{
         // this.msg.error('Erreur survenue lors du chargement des resultats: '+err.error);
        }
        
      })
      this.championService.getChampion(this.id||0).subscribe(
        data => {
          this.currentChampion=data
          this.championForm.controls['nom'].patchValue( this.currentChampion.nom);
          this.championForm.controls['sexe'].patchValue( this.currentChampion.sexe);
          this.championForm.controls['paysID'].patchValue( this.currentChampion.paysID);
          this.championForm.controls['nvPaysID'].patchValue( this.currentChampion.nvPaysID);
          this.championForm.controls['dateChangementNat2'].patchValue( new Date(this.currentChampion.dateChangementNat));
          this.championForm.controls['dateNaissance2'].patchValue( new Date(this.currentChampion.dateNaissance));
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
          console.log(' champion chargé ',this.currentChampion)
          //this.msg.info(' champion chargé');
        },
        err => {
          console.log("erreur survenue lors du chargement du champion");
          //this.msg.error("erreur survenue lors du chargement du champion");
        }
      );

this.subscriptions?.push(this.subscription1$)
this.subscriptions?.push(this.subscription2$)
this.subscriptions?.push(this.subscription3$)


  }

 
  searchValue = '';
  visible = false;
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayedResults = this.listOfResults.filter((item: any) => item.nom.indexOf(this.searchValue) !== -1);
  }
  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
  }
  
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any;
  setOfCheckedId = new Set<number>();

  submitForm(){
    let champion=new Champion()
    champion.id=this.currentChampion.id
    champion.idMongo=this.currentChampion.idMongo
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
    if(this.championForm.controls['dateChangementNat2'].value){
          champion.dateChangementNat=formatDate(this.championForm.controls['dateChangementNat2'].value,'yyyy-MM-dd',this.locale);

    }
    champion.dateNaissance=formatDate(this.championForm.controls['dateNaissance2'].value,'yyyy-MM-dd',this.locale);
    champion.poids=this.championForm.controls['poids'].value
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
this.championService.updateChampions(this.id||0,champion).subscribe(
  data=>{
    this.msg.success("champion mis a jour")
  },err=>{
    this.msg.error("erreur survenue lors de la mise a jour")
  }
)
  }


  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
}
}
