import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Video } from 'src/app/back-office/models/classes/Video';
import { Sexe } from 'src/app/back-office/models/enums/Sexe';
import { VideoCategorie } from 'src/app/back-office/models/enums/VideoCategorie';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  sexe= Sexe;
  currentVideo: any;
  sexes() : Array<string> {
    var keys = Object.keys(this.sexe);
    return keys.slice(keys.length / 2);
}
videoCategorie= VideoCategorie;
categories() : Array<string> {
  var keys = Object.keys(this.videoCategorie);
  return keys.slice(keys.length / 2);
}
 
techList:any
listOfDisplayedData:any
listOfData:any
id?:number;
listeEvents:any
videoForm!: FormGroup;
size: NzSelectSizeType = 'large';
constructor(private route: ActivatedRoute,private fb: FormBuilder,private router: Router,private dataProvider:ProviderService,private ecritService:EcritureService,private msg: NzMessageService) { }
ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.id = parseInt(params["id"]);
});
  this.videoForm = this.fb.group({
    titre: [null, [Validators.required]],
    date: [null, ],
    duree: [null,],
    objet: [null,],
    categorie: [null,[Validators.required]],
    vignette: [null],
    a_la_une: [null, [Validators.required]],
    champion_id: [null, [Validators.required]],
    technique_id: [null, ],
    technique2_id: [null],
    evenement_id: [null, [Validators.required]],
    poidID: [null],
    sexe: [null, [Validators.required]],
    top_ippon: [null, [Validators.required]],
  });
  this.dataProvider.getAllTechniques().subscribe(
    data => {
      
      this.techList=data
      console.log("exemple de technique",data[0]);
      this.msg.info(data.length+' technique chargés');
    },
    err => {
      this.msg.error('Erreur survenue lors du chargement des techniques: '+err.error);
    })
    this.dataProvider.getAllEvenements().subscribe(
      data => {
        
        this.listeEvents=data
        console.log("exemple d'evenement'",data[0]);
        this.msg.info(data.length+' evenements chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des evenements: '+err.error);
      })
        this.dataProvider.getVideo(this.id||0).subscribe(
          data => {
            this.currentVideo=data
            this.videoForm.controls['champion_id'].patchValue( this.currentVideo.champion_id);
            this.videoForm.controls['technique_id'].patchValue( this.currentVideo.technique_id);
            this.videoForm.controls['technique2_id'].patchValue( this.currentVideo.technique2_id);
            this.videoForm.controls['titre'].patchValue( this.currentVideo.titre);
            this.videoForm.controls['evenement_id'].patchValue( this.currentVideo.evenement_id);
            this.videoForm.controls['a_la_une'].patchValue( this.currentVideo.a_la_une);
            this.videoForm.controls['vignette'].patchValue( this.currentVideo.vignette);
            this.videoForm.controls['categorie'].patchValue( this.currentVideo.categorie);
            this.videoForm.controls['objet'].patchValue( this.currentVideo.objet);
            this.videoForm.controls['duree'].patchValue( this.currentVideo.duree);
            this.videoForm.controls['poidID'].patchValue( this.currentVideo.poidID);
            this.videoForm.controls['sexe'].patchValue( this.currentVideo.sexe);
            this.videoForm.controls['top_ippon'].patchValue( this.currentVideo.top_ippon);
            console.log("video chargee",this.videoForm.value);
            this.msg.info(' Video d\''+this.id+' chargée');
          },
          err => {
            this.msg.error('Erreur survenue lors du chargement de la video: '+err.error);
          })
}





submitForm(){
const vid=new Video()
vid.id=this.currentVideo.id
vid.a_la_une=this.videoForm.controls['a_la_une'].value
vid.categorie=this.videoForm.controls['categorie'].value
vid.technique2_id=this.videoForm.controls['technique2_id'].value
vid.technique_id=this.videoForm.controls['technique_id'].value
vid.champion_id=this.videoForm.controls['champion_id'].value
vid.evenement_id=this.videoForm.controls['evenement_id'].value
vid.titre=this.videoForm.controls['titre'].value
vid.top_ippon=this.videoForm.controls['top_ippon'].value
vid.date=new Date()
vid.duree=this.videoForm.controls['duree'].value
vid.poidID=this.videoForm.controls['poidID'].value
vid.sexe=this.videoForm.controls['sexe'].value
vid.vignette=this.videoForm.controls['vignette'].value
vid.objet=this.videoForm.controls['objet'].value
console.log(this.videoForm.value)
this.ecritService.updateVideo(this.id||0,vid).subscribe(
  data => {
    this.msg.success(' video mise a jour');
  },
  err => {
    this.msg.error('Erreur survenue lors de la mise a jour de la video: '+err.error);
  })
}

}
