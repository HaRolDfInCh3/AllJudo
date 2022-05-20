import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Article } from 'src/app/back-office/models/classes/Article';
import { TypeOffre } from 'src/app/back-office/models/enums/TypeOffre';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  typeoffre= TypeOffre;
  currentArticle:any;
  types() : Array<string> {
    var keys = Object.keys(this.typeoffre);
    return keys.slice(keys.length / 2);
}
size: NzSelectSizeType = 'large';
id?:number;
  
  articleForm!: FormGroup;
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private router: Router,private dataProvider:ProviderService,private msg: NzMessageService,private ecritService:EcritureService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
  });
    this.articleForm = this.fb.group({
      nom: [null, [Validators.required]],
      prix: [null, [Validators.required]],
      offre: [null,],
      marque: [null, ],
      livraison: [null, [Validators.required]],
      transporteur : [null, [Validators.required]],
      descr: [null,[Validators.required] ],
      image_pre: [null, ],
      type: [null, [Validators.required]],
      code_paypal: [null, ],
      old_prix: [null, ],
    });
    this.dataProvider.getArticle(this.id||0).subscribe(
      data => {
        this.currentArticle=data
        console.log("article chargé: ",data);
        this.msg.info(' article chargé');
        this.articleForm.controls['nom'].patchValue(this.currentArticle.nom);
        this.articleForm.controls['prix'].patchValue(this.currentArticle.prix);
        this.articleForm.controls['offre'].patchValue(this.currentArticle.offre);
        this.articleForm.controls['marque'].patchValue(this.currentArticle.marque);
        this.articleForm.controls['livraison'].patchValue(this.currentArticle.livraison);
        this.articleForm.controls['transporteur'].patchValue(this.currentArticle.transporteur);
        this.articleForm.controls['descr'].patchValue(this.currentArticle.descr);
        this.articleForm.controls['type'].patchValue(this.currentArticle.type);
        this.articleForm.controls['code_paypal'].patchValue(this.currentArticle.code_paypal);
        this.articleForm.controls['old_prix'].patchValue(this.currentArticle.old_prix);
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement de l\' article: '+err.error);
      })
  }

  




submitForm(){
    const article=new Article()
    article.id=this.currentArticle.id
    article.marque=this.articleForm.controls['marque'].value
    article.image_pre=this.articleForm.controls['image_pre'].value||this.currentArticle.image_pre
    article.nom=this.articleForm.controls['nom'].value
    article.prix=this.articleForm.controls['prix'].value
    article.offre=this.articleForm.controls['offre'].value
    article.livraison=this.articleForm.controls['livraison'].value
    article.transporteur=this.articleForm.controls['transporteur'].value
    article.descr=this.articleForm.controls['descr'].value
    article.type=this.articleForm.controls['type'].value
    article.code_paypal=this.articleForm.controls['code_paypal'].value
    article.old_prix=this.articleForm.controls['old_prix'].value
    this.ecritService.updateArticle(this.id||0,article).subscribe(
      data => {
        console.log(article)
        this.msg.success('article mis a jour');
      },
      err => {
        console.log("erreur survenue lors de la mise a jour");
        this.msg.error("erreur survenue lors de la mise a jour");
      }
    );

}
}
