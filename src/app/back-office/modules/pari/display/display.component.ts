import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Pari } from 'src/app/back-office/models/classes/Pari';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  pariForm!: FormGroup;
  evenements: Array<any> = [];
  size: NzSelectSizeType = 'large';
  listOfData:any;
  listOfDisplayedData: any;
  submitForm(): void {
    const pari=new Pari()
    pari.date_debut=this.pariForm.controls['date_debut'].value
    pari.date_fin=this.pariForm.controls['date_fin'].value
    pari.actif=this.pariForm.controls['actif'].value
    pari.description=this.pariForm.controls['description'].value
    pari.evenement_id=this.pariForm.controls['evenement_id'].value
    pari.corrige=false
    console.log("formulairre",this.pariForm.value);
    console.log("pari",pari);
    this.ecritService.addPari(pari).subscribe(
      data => {
        this.msg.success('pari ajouté');
        this.listOfData = [data].concat(this.listOfData)
        this.listOfDisplayedData = [data].concat(this.listOfDisplayedData)
      },
      err => {
        console.log("erreur survenue lors de l'ajout");
        this.msg.error("erreur survenue lors de l'ajout");
      }
    );
  }

  constructor(private dataProvider:ProviderService,private fb: FormBuilder,private router: Router,private msg: NzMessageService,private ecritService:EcritureService,private evenS:EvenementsService,private route: ActivatedRoute) {
    

    
  }

  ngOnInit(): void {
    this.pariForm = this.fb.group({
      date_debut: [null, [Validators.required]],
      date_fin: [null, ],
      description: [null, [Validators.required]],
      actif: [null, [Validators.required]],
      evenement_id: [null, [Validators.required]],
    });
    this.dataProvider.getAllParis().subscribe(
      data => {
        this.listOfDisplayedData=data
        this.listOfData=data
        console.log("exemple de pari",data[0]);
        this.msg.info(data.length+' pari chargées');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des pari: '+err.error);
      })
      this.evenS.getAllEvenementsDesc().subscribe(
        data => {
          
          this.evenements=data
          console.log("exemple d'evenement",data[0]);
          this.msg.info(data.length+' evenements chargées');
        },
        err => {
          this.msg.error('Erreur survenue lors du chargement des evenements: '+err.error);
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
    this.listOfDisplayedData = this.listOfData.filter((item: any) => item.evenement2?.intitule.indexOf(this.searchValue) !== -1);
  }
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any;
  setOfCheckedId = new Set<number>();
  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
  }
  delete(id:number){
    this.ecritService.deletePari(id).subscribe(
      data => {
        this.msg.success(' supression du pari d\'id: '+id);
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
  composition(id:number){
    this.router.navigate(['composition/'+id],{relativeTo:this.route});
  }
  resultat(id:number){
    this.router.navigate(['resultat/'+id],{relativeTo:this.route});
  }
  

}

