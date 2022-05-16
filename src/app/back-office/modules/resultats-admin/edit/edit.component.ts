import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Champion_admin_externe_palmares } from 'src/app/back-office/models/classes/Champion_admin_externe_palmares';
import { CompetitionType } from 'src/app/back-office/models/enums/CompetitionType';
import { IntituleCompetitionFrancais } from 'src/app/back-office/models/enums/IntituleCompetitionFrancais';
import { ChampionsService } from 'src/app/back-office/services-backoffice/champions.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  categorieAge:any
  listeDep:any
  listeRegion:any
  intituleFr= IntituleCompetitionFrancais
  intilileFRs() : Array<string> {
    var keys = Object.keys(this.intituleFr);
    return keys.slice(keys.length / 2);
  }
  competitionType=CompetitionType
  types(): Array<string> {
    var keys = Object.keys(this.competitionType);
    return keys.slice(keys.length / 2);
  }
  id?:number;
  size: NzSelectSizeType = 'large';
  currentResult:any;
  resultatAdminForm!: FormGroup;
  constructor(private dataProvider:ProviderService,private fb: FormBuilder,private route: ActivatedRoute,private msg: NzMessageService,private championService:ChampionsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
  });
  this.resultatAdminForm = this.fb.group({
    rang: [null, [Validators.required]],
    championID: [null, [Validators.required]],
    poidsID: [null, [Validators.required]],
    date: [null,[Validators.required]],
    categorieAge: [null,  [Validators.required]],
    competitionType: [null,  [Validators.required]],
    competitionLieu: [null, ],
    competitionDepID: [null, ],
    competitionRegID: [null, ],
    competitionFr: [null, ],
  });
  this.dataProvider.getAllDepartements().subscribe(
    data => {
      
      this.listeDep=data
      console.log("exemple dedepartement'",data[0]);
      this.msg.info(data.length+'departements chargés');
    },
    err => {
      this.msg.error('Erreur survenue lors du chargement des departements: '+err.error);
    })
    this.dataProvider.getAllRegions().subscribe(
      data => {
        
        this.listeRegion=data
        console.log("exemple de region'",data[0]);
        this.msg.info(data.length+' regions chargées');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des regions: '+err.error);
      })
      this.dataProvider.getAllEvCategoriesAge().subscribe(
        data => {
          
          this.categorieAge=data
          console.log("exemple de categorie d'age'",data[0]);
          this.msg.info(data.length+' categories d\'ages\' chargées');
        },
        err => {
          this.msg.error('Erreur survenue lors du chargement des categories d ages: '+err.error);
        })
    this.championService.getChampionAdminPalmares(this.id||0).subscribe(
      data => {
        
        this.currentResult=data
        this.resultatAdminForm.controls['rang'].patchValue( this.currentResult.rang);
        this.resultatAdminForm.controls['championID'].patchValue( this.currentResult.championID);
        this.resultatAdminForm.controls['poidsID'].patchValue( this.currentResult.poidsID);
        this.resultatAdminForm.controls['date'].patchValue( new Date(this.currentResult.date));
        this.resultatAdminForm.controls['competitionType'].patchValue( this.currentResult.competitionType);
        this.resultatAdminForm.controls['categorieAge'].patchValue( this.currentResult.categorieAge);
        this.resultatAdminForm.controls['competitionLieu'].patchValue( this.currentResult.competitionLieu);
        this.resultatAdminForm.controls['competitionRegID'].patchValue( this.currentResult.competitionRegID);
        this.resultatAdminForm.controls['competitionDepID'].patchValue( this.currentResult.competitionDepID)
        this.resultatAdminForm.controls['competitionFr'].patchValue( this.currentResult.competitionFr);
        console.log("resultat chargé",this.resultatAdminForm.value);
        this.msg.info(' resultat chargé');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des resultats: '+err.error);
      })
    
  
  }

  submitForm(){
const caep=new Champion_admin_externe_palmares()
    caep.rang=this.resultatAdminForm.controls['rang'].value
    caep.championID=this.currentResult.championID
    caep.poidsID=this.resultatAdminForm.controls['poidsID'].value
    caep.date=this.resultatAdminForm.controls['date'].value
    caep.competitionType=this.resultatAdminForm.controls['competitionType'].value
    caep.categorieAge=this.resultatAdminForm.controls['categorieAge'].value
    caep.competitionLieu=this.resultatAdminForm.controls['competitionLieu'].value
    caep.competitionRegID=this.resultatAdminForm.controls['competitionRegID'].value
    caep.competitionDepID=this.resultatAdminForm.controls['competitionDepID'].value
    caep.competitionFr=this.resultatAdminForm.controls['competitionFr'].value
    caep.id=this.currentResult.id
    caep.idMongo=this.currentResult.idMongo
    console.log("envoyé: ",caep)
    this.championService.updateChampion_admin_externe_palmares(this.currentResult.id,caep).subscribe(
      data => {
        console.log(caep)
        this.msg.success('resultat administré mise a jour');
      },
      err => {
        console.log("erreur survenue lors de la mise a jour");
        this.msg.error("erreur survenue lors de la mise a jour");
      }
    );
  }
}
