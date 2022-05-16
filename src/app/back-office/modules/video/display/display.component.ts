import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Video } from 'src/app/back-office/models/classes/Video';
import { Sexe } from 'src/app/back-office/models/enums/Sexe';
import { VideoCategorie } from 'src/app/back-office/models/enums/VideoCategorie';
import { ClubsService } from 'src/app/back-office/services-backoffice/clubs.service';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  sexe= Sexe;
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
listeEvents:any
videoForm!: FormGroup;
size: NzSelectSizeType = 'large';
constructor(private route: ActivatedRoute,private fb: FormBuilder,private router: Router,private dataProvider:ProviderService,private ecritService:EcritureService,private msg: NzMessageService) { }
ngOnInit(): void {
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
      this.dataProvider.getAllVideos().subscribe(
        data => {
          
          this.listOfData=data
          this.listOfDisplayedData=data
          console.log("exemple de video",data[0]);
          this.msg.info(data.length+' videos chargés');
        },
        err => {
          this.msg.error('Erreur survenue lors du chargement des videos: '+err.error);
        })
}


edit(id:number){
  this.router.navigate(['edit/'+id],{relativeTo:this.route});
}
delete(id:number){
  this.ecritService.deleteVideo(id).subscribe(
    data => {
      this.msg.success(' supression de la video d\'id: '+id);
      this.listOfDisplayedData = this.listOfData.filter((item: any) => item.id !==id);
      this.listOfData = this.listOfData.filter((item: any) => item.id !==id);

    },
    err => {
      this.msg.error('Erreur survenue lors de la supression : '+err.error);
    })
}

//--------------- filtre
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
onCurrentPageDataChange($event: any): void {
this.listOfCurrentPageData = $event;
}

checked = false;
indeterminate = false;
listOfCurrentPageData: any;
setOfCheckedId = new Set<number>();


submitForm(){
const vid=new Video()
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
this.ecritService.addVideo(vid).subscribe(
  data => {
    this.msg.success(' video ajoutee');
  },
  err => {
    this.msg.error('Erreur survenue lors de l\'ajout de la video: '+err.error);
  })
}

}
