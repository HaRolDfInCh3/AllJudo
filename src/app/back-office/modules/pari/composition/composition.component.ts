import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { filter } from 'rxjs/operators';
import { Pari_composition } from 'src/app/back-office/models/classes/Pari_composition';
import { Pari_compositionElement } from 'src/app/back-office/models/classes/Pari_compositionElement';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.css']
})
export class CompositionComponent implements OnInit {
  id?:number;
    listOfData:any;
    listOfDisplayedData:any;
    currentPari: any;
    compoForm!: FormGroup;
    fileList: NzUploadFile[] = [];
    uploading: boolean=false;
  submitForm(): void {
   
    
  }
  
  constructor(private http:HttpClient,private dataProvider:ProviderService,private fb: FormBuilder,private router: Router,private msg: NzMessageService,private ecritService:EcritureService,private route: ActivatedRoute) {
    
  
    
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
  });
  this.compoForm = this.fb.group({
    sexe: [null, [Validators.required]],
    poid: [null,[Validators.required] ],
    date: [null, [Validators.required]],
    
  });
  this.dataProvider.getPariCompositionsDesc(this.id||0).subscribe(
    data => {
      this.msg.success(data.length+' pari compositions recuperes');
      this.listOfData=data
      this.listOfDisplayedData=data
      console.log("exemple de compisition:",data[0])
    },
    err => {
      console.log("erreur survenue lors de la reception");
      this.msg.error("erreur survenue lors de la reception");
    }
  );
  
  }
  edit(idCompo:number,idCompoElement:number,index:number){
    //console.log("position: "+idCompoElement+" eme element de la composition "+idCompo)
   // console.log("valeur", this.listOfDisplayedData[index].elements[idCompoElement-1])
    }
    send(idCompo:number,index:number){ 
      console.log("position: "+idCompo+" eme composition ")
      console.log('forfaits: ', this.forfaits);
        console.log('participants: ', this.participants);
    this.forfaits="";
    this.participants="";
     // console.log("valeur", this.listOfDisplayedData[index])
     /* 
     const pariComposition=new Pari_composition()
      pariComposition.id=this.listOfDisplayedData[index].id
      pariComposition.idMongo=this.listOfDisplayedData[index].idMongo
      pariComposition.pari=this.listOfDisplayedData[index].pari
      pariComposition.sexe=this.listOfDisplayedData[index].sexe
      pariComposition.poid=this.listOfDisplayedData[index].poid
      pariComposition.date=this.listOfDisplayedData[index].date
      pariComposition.participant=this.listOfDisplayedData[index].participant
      pariComposition.forfait=this.listOfDisplayedData[index].forfait
      pariComposition.podium_final=this.listOfDisplayedData[index].podium_final
      pariComposition.premier_final=this.listOfDisplayedData[index].premier_final
      let elements: Array<Pari_compositionElement>=[]
      this.listOfDisplayedData[index].elements.forEach(function (value:any) {

        const pce =new Pari_compositionElement()
        pce.id=value.id
        pce.idMongo=value.idMongo
        pce.participant=value.participant
        pce.podium=value.podium
        pce.premier=value.premier
        elements.push(pce)
    });
    pariComposition.elements=elements
    console.log(pariComposition)
    this.ecritService.updatePari_composition(idCompo||0,pariComposition).subscribe(
      data => {
        this.msg.success(' pari compositions mis a jour');
      },
      err => {
        console.log("erreur survenue lors de la mise a jour");
        this.msg.error("erreur survenue lors de la mise a jour");
      }
    );*/


    }
  getId(id:number){
    return "id"+id
  }
  getIdRef(id:number){
    return "#id"+id
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
    const req = new HttpRequest('POST', 'http://localhost:2008/uploadCompo', formData, {
      // reportProgress: true
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }

  addcategorie(){
    const pariComposition=new Pari_composition()
      pariComposition.pari=this.id
      pariComposition.date=this.compoForm.controls["date"].value
      pariComposition.poid=this.compoForm.controls["poid"].value
      pariComposition.sexe=this.compoForm.controls["sexe"].value
      let elements2: Array<Pari_compositionElement>=[]
      pariComposition.elements=elements2
    this.ecritService.addPari_composition(pariComposition).subscribe(
      data => {
        this.msg.success(' pari composition ajouté');
        this.listOfData = this.listOfData.concat([data])
    this.listOfDisplayedData = this.listOfDisplayedData.concat([data])
      },
      err => {
        console.log("erreur survenue lors de l'ajout");
        this.msg.error("erreur survenue lors de l'ajout");
      }
    );
  }












  participantName!:string;



  

  select(ret: {}): void {
    //console.log('nzSelectChange', ret);
  }
  participants:string=""
  forfaits:string=""
  change(ret: any): void {
    if(ret.to=="left"){
      
      ret.list.forEach( (value:any) => {
      this.participants+=value.id+":"+value.participant+";"
      this.forfaits=this.forfaits.replace(value.id+":"+value.participant+";","")
      
    });
    }else{
      
      ret.list.forEach( (value:any) => {
        this.forfaits+=value.id+":"+value.participant+";"
       this.participants= this.participants.replace(value.id+":"+value.participant+";","")
        
      });
    }
  }

  addElement(id:number,index:number){
    const pce =new Pari_compositionElement()
    pce.participant=this.participantName
    pce.podium=false
    pce.premier=false
    pce.paricompositionid=id
    this.ecritService.addPari_compositionElement(pce).subscribe(
      data => {
        this.msg.success(' pari composition element ajouté');
        this.listOfDisplayedData[index].elements.push(data)
        //console.log(this.listOfDisplayedData[index])
      },
      err => {
        console.log("erreur survenue lors de l'ajout");
        this.msg.error("erreur survenue lors de l'ajout");
      }
    );
  }

  }
  
  
  