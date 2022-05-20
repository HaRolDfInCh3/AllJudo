import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Technique } from 'src/app/back-office/models/classes/Technique';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
id?:number
techniqueForm!: FormGroup;
  currentTech: any;
constructor(private route: ActivatedRoute,private fb: FormBuilder,private router: Router,private dataProvider:ProviderService,private msg: NzMessageService,private ecritService:EcritureService) { }

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.id = parseInt(params["id"]);
});
  this.techniqueForm = this.fb.group({
    nom: [null, [Validators.required]],
    famille: [null, [Validators.required]],
    presentation: [null, [Validators.required]],
    conseils: [null, [Validators.required]],
    
    presentation_en: [null, ],
    conseils_en: [null, ],
  });
  this.dataProvider.getTechnique(this.id||0).subscribe(
    data => {
      this.currentTech=data
      this.techniqueForm.controls['famille'].patchValue( this.currentTech.famille);
      this.techniqueForm.controls['presentation'].patchValue( this.currentTech.presentation);
      this.techniqueForm.controls['presentation_en'].patchValue( this.currentTech.presentation_en);
      this.techniqueForm.controls['conseils'].patchValue( this.currentTech.conseils);
      this.techniqueForm.controls['conseils_en'].patchValue( this.currentTech.conseils_en);
      this.techniqueForm.controls['nom'].patchValue( this.currentTech.nom);
      
      console.log("technique chargee",this.techniqueForm.value);
      this.msg.info(' technique d\''+this.id+' chargée');
    },
    err => {
      this.msg.error('Erreur survenue lors du chargement de la technique: '+err.error);
    })
  }

  submitForm(){
    const tech=new Technique()
    tech.id=this.currentTech.id
    tech.conseils=this.techniqueForm.controls['conseils'].value
    tech.famille=this.techniqueForm.controls['famille'].value
    tech.nom=this.techniqueForm.controls['nom'].value
    tech.presentation=this.techniqueForm.controls['presentation'].value
    tech.presentation_en=this.techniqueForm.controls['presentation_en'].value
    tech.conseils_en=this.techniqueForm.controls['conseils_en'].value
    this.ecritService.updateTechnique(this.currentTech.id,tech).subscribe(
      data => {
        console.log(tech)
        this.msg.success('technique mise a jour');
      },
      err => {
        console.log("erreur survenue lors de la mise a jour");
        this.msg.error("erreur survenue lors de la mise a jour");
      }
    );
  }
}
