import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent implements OnInit {
  id?: number;
  listOfData:any;
  evenement:any;
  fileForm!: FormGroup;
  listOfDisplayedData:any;
  listOfCurrentPageData: any;
  fileList: NzUploadFile[] = [];
  uploading: boolean=false;
  constructor(private http:HttpClient,private route: ActivatedRoute,private fb: FormBuilder,private msg: NzMessageService,private evenementService:EvenementsService) { }

  ngOnInit(): void {
    this.fileForm = this.fb.group({
      fileName: [null, [Validators.required]]
    });
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
  });
  this.evenementService.getEvenement(this.id||0).subscribe(
    data => {
      
      this.evenement=data
      console.log("evenement concerné",data);
    },
    err => {
      this.msg.error('Erreur survenue lors du chargement de l\'evenement: '+err.error);
    })
  this.evenementService.getEventResults(this.id||0).subscribe(
    data => {
      
      this.listOfData=data
      this.listOfDisplayedData=data
      console.log("exemple de resultat",data[0]);
      this.msg.info(data.length+' resutats chargées');
    },
    err => {
      console.log(err)
      if(err.status==404){
        this.msg.error('Resultats inexistants');
      }else{
        this.msg.error('Erreur survenue: '+err.error);
      }
      
    })
  }
  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
  }
  searchValue = '';
  visible = false;
  reset(): void {
    this.searchValue = '';
    this.search();
    //ici un en cas d'annulation dui filtre les elements dont le champ est null
    //disparaissent
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayedData = this.listOfData.filter((item: any) => item.champion2?item.champion2.nom.indexOf(this.searchValue) !== -1:false);
  }
  edit(id:number){

  }
  delete(id:number){

  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploading = true;
    // You can use any AJAX library you like
    this.evenementService.uploadResults(this.evenement.id,formData).subscribe(
        data => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
        },
        err => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }
  

  

}
