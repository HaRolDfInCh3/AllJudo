import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { EvenementImportant } from 'src/app/back-office/models/classes/EvenementImportant';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id?: number;
  evenements: any;
  size: NzSelectSizeType = 'large';
  evenementImportantForm!: FormGroup;
  currentEvent: any;
  constructor(private fb: FormBuilder,private route: ActivatedRoute,private evenementImportantService:EvenementsService,private msg: NzMessageService) { }

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
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
  });
  this.evenementImportantService.getAllEvenements().subscribe(
    data => {
      this.evenements=data
      this.msg.info(this.evenements.length+' evenements chargés');
    },
    err => {
      console.log("erreur survenue lors du chargement des evenements");
      this.msg.error("erreur survenue lors du chargement des evenements");
    }
  );
  this.evenementImportantService.getEvenementImportant(this.id||0).subscribe(
    data => {
      this.currentEvent=data
      this.evenementImportantForm.controls['text1'].patchValue( this.currentEvent.text1);
      this.evenementImportantForm.controls['text2'].patchValue( this.currentEvent.text2);
      this.evenementImportantForm.controls['text3'].patchValue( this.currentEvent.text3);
      this.evenementImportantForm.controls['nom'].patchValue( this.currentEvent.nom);
      this.evenementImportantForm.controls['lien'].patchValue( this.currentEvent.lien);
      this.evenementImportantForm.controls['evenement_id'].patchValue( this.currentEvent.evenement_id);
     // this.evenementImportantForm.controls[''].patchValue( this.currentEvent.);
      this.msg.info(' evenement important chargé');
    },
    err => {
      console.log("erreur survenue lors du chargement de l'evenement");
      this.msg.error("erreur survenue lors du chargement de l'evenement");
    }
  );
  }

  updateForm(){
    const ei=new EvenementImportant()
    ei.text1=this.evenementImportantForm.controls['text1'].value
    ei.text2=this.evenementImportantForm.controls['text2'].value
    ei.text3=this.evenementImportantForm.controls['text3'].value
    ei.evenement_id=this.evenementImportantForm.controls['evenement_id'].value
    ei.logo=this.evenementImportantForm.controls['logo'].value||this.currentEvent.logo
    ei.lien=this.evenementImportantForm.controls['lien'].value
    ei.nom=this.evenementImportantForm.controls['nom'].value
    console.log(ei)
    this.evenementImportantService.updateEvenementImportant(this.id||0,ei).subscribe(
      data => {
        this.msg.success(' evenement important mis a jour');
      },
      err => {
        console.log("erreur survenue lors de la mise a jour de l'evenement");
        this.msg.error("erreur survenue lors de la mise a jour de l'evenement");
      }
    );
  }

}
