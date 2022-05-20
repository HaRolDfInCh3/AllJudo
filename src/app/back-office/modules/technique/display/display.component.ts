import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Technique } from 'src/app/back-office/models/classes/Technique';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  listOfDisplayedData: any;
  listOfData: any;
  techniqueForm!: FormGroup;
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private router: Router,private dataProvider:ProviderService,private msg: NzMessageService,private ecritService:EcritureService) { }

  ngOnInit(): void {
    this.techniqueForm = this.fb.group({
      nom: [null, [Validators.required]],
      famille: [null, [Validators.required]],
      presentation: [null, [Validators.required]],
      conseils: [null, [Validators.required]],
    });
    this.dataProvider.getAllTechniques().subscribe(
      data => {
        this.listOfData=data
        this.listOfDisplayedData=data
        console.log("exemple de technique",data[0]);
        this.msg.info(data.length+' techniques chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des techniques: '+err.error);
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


//------------actions

delete(id:number){
  this.ecritService.deleteTechnique(id).subscribe(
    data => {
      this.msg.success(' supression de la technique d\'id: '+id);
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


submitForm(){
    const tech=new Technique()
    tech.conseils=this.techniqueForm.controls['conseils'].value
    tech.famille=this.techniqueForm.controls['famille'].value
    tech.nom=this.techniqueForm.controls['nom'].value
    tech.presentation=this.techniqueForm.controls['presentation'].value
    this.ecritService.addTechnique(tech).subscribe(
      data => {
        console.log(tech)
        this.msg.success('technique ajoutée');
        this.listOfData = [data].concat(this.listOfData)
       this.listOfDisplayedData = [data].concat(this.listOfDisplayedData)
      },
      err => {
        console.log("erreur survenue lors de l'ajout");
        this.msg.error("erreur survenue lors de l'ajout");
      }
    );

}
}
