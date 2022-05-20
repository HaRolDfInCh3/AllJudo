import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Bannieres_par_taille } from 'src/app/back-office/models/classes/Bannieres_par_taille';
import { StatusBanniere } from 'src/app/back-office/models/enums/StatusBanniere';
import { Tailles } from 'src/app/back-office/models/enums/tailles';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id?:number
  selectedTags: string[] = [];
  statusbanniere= StatusBanniere;
  taille=Tailles;
  hotTags = ['photos','judokas','technique','accueil', 'actualite', 'resultats', 'calendrier','videos','detente','annuaires','savoirs'];
  currentBanierre: any;
  status() : Array<string> {
    var keys = Object.keys(this.statusbanniere);
    return keys.slice(keys.length / 2);
}
tailles() : Array<string> {
  var keys = Object.keys(this.taille);
  return keys.slice(keys.length / 2);
}
  banniereForm!: FormGroup;
  restrictions:string=""
  evenements: Array<any> = [];
  bannierecategories: Array<any> = [];
  size: NzSelectSizeType = 'large';

  submitForm(): void {
    const banniere=new Bannieres_par_taille()
    banniere.id=this.id
    banniere.nom=this.banniereForm.controls['nom'].value
    banniere.code=this.banniereForm.controls['code'].value
    banniere.image=this.banniereForm.controls['image'].value||this.currentBanierre.image
    banniere.url=this.banniereForm.controls['url'].value
    banniere.actif=this.banniereForm.controls['actif'].value
    banniere.restriction=this.restrictions
    banniere.taille=this.banniereForm.controls['taille'].value
    console.log("formulairre",this.banniereForm.value);
    console.log("banniere",banniere);
    this.ecritService.updateBannieres_par_taille(this.id||0,banniere).subscribe(
      data => {
        this.msg.success('banniere mise a jour');
       
      },
      err => {
        console.log("erreur survenue lors de la mise a jour");
        this.msg.error("erreur survenue lors de la mise a jour");
      }
    );
    
  }

  constructor(private dataProvider:ProviderService,private fb: FormBuilder,private router: Router,private msg: NzMessageService,private ecritService:EcritureService,private route: ActivatedRoute) {
    

    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
  });
    this.banniereForm = this.fb.group({
      nom: [null, [Validators.required]],
      code: [null, [Validators.required]],
      image: [null, ],
      url: [null, [Validators.required]],
      actif: [null, [Validators.required]],
      taille: [null, [Validators.required]],
    });
    this.dataProvider.getBannieres_par_taille(this.id||0).subscribe(
      data => {
        console.log("banniere chargee",data);
        this.msg.info(' banniere chargée');
        this.currentBanierre=data
        this.banniereForm.controls['nom'].patchValue(this.currentBanierre.nom);
        this.banniereForm.controls['code'].patchValue(this.currentBanierre.code);
        this.banniereForm.controls['url'].patchValue(this.currentBanierre.url);
        this.banniereForm.controls['actif'].patchValue(this.currentBanierre.actif);
        this.banniereForm.controls['taille'].patchValue(this.currentBanierre.taille);
        this.selectedTags=data.restriction.split("|")
        this.restrictions=this.currentBanierre.restriction
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des banniere: '+err.error);
      })
    
        
    


    }

  
  handleChange(checked: boolean, tag: string): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    this.restrictions= this.selectedTags.join("|")
  }
  check(s:string){
    if(this.restrictions.includes(s)){
      return "blue"
    }else{
      return "gold"
    }
    
  }

}

