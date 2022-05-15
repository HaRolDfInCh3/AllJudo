import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { EvenementImportant } from 'src/app/back-office/models/classes/EvenementImportant';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  
  evenementImportantForm!: FormGroup;
  types: Array<{ label: string; value: string }> = [];
  evenementImportants: Array<{ label: string; value: string }> = [];
  size: NzSelectSizeType = 'large';
  evenements:any;
  listOfData:any;
  listOfDisplayedData:any;
  submitForm(): void {
    console.log(this.evenementImportantForm.value);
    const evenementImportant=new EvenementImportant()
    evenementImportant.nom=this.evenementImportantForm.controls['nom'].value
    evenementImportant.text1=this.evenementImportantForm.controls['text1'].value
    evenementImportant.text2=this.evenementImportantForm.controls['text2'].value
    evenementImportant.text3=this.evenementImportantForm.controls['text3'].value
    evenementImportant.evenement_id=this.evenementImportantForm.controls['evenement_id'].value
    evenementImportant.lien=this.evenementImportantForm.controls['lien'].value
    evenementImportant.logo=this.evenementImportantForm.controls['logo'].value
    this.evenementImportantService.addEvenementImportant(evenementImportant).subscribe(
      data => {
        this.msg.success('evenementImportants crée avec succès !');
      },
      err => {
        console.log("erreur survenue lors de l'ajout");
        this.msg.error("erreur survenue lors de l'ajout");
      }
    );
    
    
  }

  constructor(private router: Router,private route:ActivatedRoute,private fb: FormBuilder,private msg: NzMessageService,private evenementImportantService:EvenementsService) {
    
  }

  ngOnInit(): void {
    this.evenementImportantForm = this.fb.group({
      nom: [null, [Validators.required]],
      text1: [null, ],
      text2: [null, ],
      text3: [null, ],
      evenement_id: [null, [Validators.required]],
      lien: [null, ],
      logo: [null, ],
    });
    this.evenementImportantService.getAllEvenementImportants().subscribe(
      data => {
        
        this.listOfData=data
        this.listOfDisplayedData=data
        console.log("exemple de evenementImportants",data[0]);
        this.msg.info(data.length+' evenementImportants chargées');
      },
      err => {
        this.msg.error('Erreur survenue: '+err.error);
      })
      this.evenementImportantService.getAllEvenements().subscribe(
        data => {
          this.evenements=data
          this.msg.info(this.evenements.length+' evenements chargés');
          console.log("exemple de evenement",data[0]);
        },
        err => {
          console.log("erreur survenue lors du chargement des evenements");
          this.msg.error("erreur survenue lors du chargement des evenements");
        }
      );
    

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

 
  edit(id:number){
    this.router.navigate(['edit/'+id],{relativeTo:this.route});
  }

  delete(id:number){
    this.evenementImportantService.deleteEvenementImportant(id).subscribe(
      data => {
        this.msg.success(' supression de la evenementImportant d\'id: '+id);
        this.listOfDisplayedData = this.listOfData.filter((item: any) => item.id !==id);
        this.listOfData = this.listOfData.filter((item: any) => item.id !==id);

      },
      err => {
        this.msg.error('Erreur survenue lors de la supression : '+err.error);
      })
  }
  

}
