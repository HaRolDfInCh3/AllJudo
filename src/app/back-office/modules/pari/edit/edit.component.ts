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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
id?:number;
  
pariForm!: FormGroup;
evenements: Array<any> = [];
size: NzSelectSizeType = 'large';
  currentPari: any;
submitForm(): void {
  const pari=new Pari()
  pari.id=this.id||0
  pari.date_debut=this.pariForm.controls['date_debut'].value
  pari.date_fin=this.pariForm.controls['date_fin'].value
  pari.actif=this.pariForm.controls['actif'].value
  pari.description=this.pariForm.controls['description'].value
  pari.evenement_id=this.pariForm.controls['evenement_id'].value
  pari.corrige=this.pariForm.controls['corrige'].value
  console.log("formulairre",this.pariForm.value);
  console.log("pari",pari);
  this.ecritService.addPari(pari).subscribe(
    data => {
      this.msg.success('pari mis a jour');
    },
    err => {
      console.log("erreur survenue lors de la mise a jour");
      this.msg.error("erreur survenue lors de la mise a jour");
    }
  );
}

constructor(private dataProvider:ProviderService,private fb: FormBuilder,private router: Router,private msg: NzMessageService,private ecritService:EcritureService,private evenS:EvenementsService,private route: ActivatedRoute) {
  

  
}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.id = parseInt(params["id"]);
});
  this.pariForm = this.fb.group({
    date_debut: [null, [Validators.required]],
    date_fin: [null, ],
    corrige: [null, ],
    description: [null, [Validators.required]],
    actif: [null, [Validators.required]],
    evenement_id: [null, [Validators.required]],
  });
  this.dataProvider.getPari(this.id||0).subscribe(
    data => {
      this.currentPari=data
      this.pariForm.controls["date_debut"].patchValue(new Date(this.currentPari.date_debut))
      this.pariForm.controls["date_fin"].patchValue(new Date(this.currentPari.date_fin))
      this.pariForm.controls["description"].patchValue(this.currentPari.description)
      this.pariForm.controls["actif"].patchValue(this.currentPari.actif)
      this.pariForm.controls["corrige"].patchValue(this.currentPari.corrige)
      this.pariForm.controls["evenement_id"].patchValue(this.currentPari.evenement_id)
      console.log("pari",data);
      this.msg.info(' pari chargé');
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


}


