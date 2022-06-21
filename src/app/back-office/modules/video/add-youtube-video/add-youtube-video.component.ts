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
  selector: 'app-add-youtube-video',
  templateUrl: './add-youtube-video.component.html',
  styleUrls: ['./add-youtube-video.component.css']
})
export class AddYoutubeVideoComponent implements OnInit {
  videoForm!: FormGroup;
  video:any
  id?:string
  size: NzSelectSizeType = 'large';
  techList:any
  listeEvents:any
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
    this.route.params.subscribe(params => {
      this.id = params["id"];
  });
    this.dataProvider.getYoutubeVideoById(this.id||"").subscribe(
      data=>{
        this.video=data
        this.msg.success("Video recuperée")
        console.log("video recuperee: ",data)
        this.videoForm.controls["titre"].patchValue(this.video.title)
        this.videoForm.controls["duree"].patchValue(this.video.duration)
        this.videoForm.controls["objet"].patchValue("https://www.youtube.com/embed/"+this.id)
        this.videoForm.controls["vignette"].patchValue(this.video.image)
      },
      err=>{
        this.msg.error("erreur survenue") 
      }
    )
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
       
  }



  
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
  console.log("envoyé :",this.videoForm.value)
  this.ecritService.addVideo(vid).subscribe(
    data => {
      this.msg.success(' video youtube ajoutee');
      console.log("recu :",data)
      
    },
    err => {
      this.msg.error('Erreur survenue lors de l\'ajout de la video: '+err.error);
    })
  }
  

}
