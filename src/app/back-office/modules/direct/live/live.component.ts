import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { filter } from 'rxjs/operators';
import { EvenementImportantDirect } from 'src/app/back-office/models/classes/EvenementImportantDirect';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {
  id?:number;
  evenementImportantDirectForm!: FormGroup;
  size: NzSelectSizeType = 'large';
  imagesList: NzUploadFile[] = [];
  uploadingImages: boolean=false;
  mp3List:  NzUploadFile[] = [];
  uploadingMp3: boolean=false;
  constructor(private http:HttpClient,private fb: FormBuilder,private route: ActivatedRoute,private msg: NzMessageService,private evenementImportantService:EvenementsService) { }
  evenementD:any;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
  });
  this.evenementImportantService.getEvenementImportant(this.id||0).subscribe(
    data => {
      console.log("exemple de evenementImportant",data);
      this.evenementD=data
      this.msg.info('evenementImportantDirect chargé');
    },
    err => {
      this.msg.error('Erreur survenue: '+err.error);
    })
    this.evenementImportantDirectForm = this.fb.group({
      titre: [null, [Validators.required]],
      texte: [null, ],
      une: [null, ]
    });

  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.imagesList = this.imagesList.concat(file);
    return false;
  };

  handleUpload(): void {
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.imagesList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploadingImages = true;
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', '', formData, {
      // reportProgress: true
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.uploadingImages = false;
          this.imagesList = [];
          this.msg.success('upload successful.');
        },
        () => {
          this.uploadingImages = false;
          this.msg.error('upload failed.');
        }
      );
  }

  beforeUpload2 = (file: NzUploadFile): boolean => {
    this.mp3List = this.mp3List.concat(file);
    return false;
  };

  handleUpload2(): void {
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.mp3List.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploadingMp3 = true;
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', '', formData, {
      // reportProgress: true
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.uploadingMp3 = false;
          this.mp3List = [];
          this.msg.success('upload successfully.');
        },
        () => {
          this.uploadingMp3 = false;
          this.msg.error('upload failed.');
        }
      );
  }

  submitForm(){
    const eid=new EvenementImportantDirect()
    const USER_KEY = 'utilisateur';
    const userString = JSON.parse(window.sessionStorage.getItem(USER_KEY)||"") ;
    let user = JSON.parse(userString);
    eid.admin=user.userName
    eid.date=new Date()
    eid.texte=this.evenementImportantDirectForm.controls['texte'].value
    eid.titre=this.evenementImportantDirectForm.controls['titre'].value
    eid.evenement_important_id=this.id
    eid.une=this.evenementImportantDirectForm.controls['une'].value

    console.log(eid)
    this.evenementImportantService.addEvenementImportantDirect(eid).subscribe(
      data => {
        this.msg.success(' evenement important crée');
      },
      err => {
        console.log("erreur survenue lors de la mise a jour de l'evenement");
        this.msg.error("erreur survenue lors de la mise a jour de l'evenement");
      }
    );
  }

}
