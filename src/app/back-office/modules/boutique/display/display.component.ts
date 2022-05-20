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
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  typeoffre= TypeOffre;
  listOfDisplayedData:any;
  types() : Array<string> {
    var keys = Object.keys(this.typeoffre);
    return keys.slice(keys.length / 2);
}
size: NzSelectSizeType = 'large';
  listOfData: any;
  articleForm!: FormGroup;
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private router: Router,private dataProvider:ProviderService,private msg: NzMessageService,private ecritService:EcritureService) { }

  ngOnInit(): void {
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
    this.dataProvider.getAllArticles().subscribe(
      data => {
        this.listOfData=data
        this.listOfDisplayedData=data
        console.log("exemple de article",data[0]);
        this.msg.info(data.length+' articles chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des articles: '+err.error);
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
this.listOfDisplayedData = this.listOfData.filter((item: any) => item.type.indexOf(this.searchValue) !== -1);
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
  this.ecritService.deleteArticle(id).subscribe(
    data => {
      this.msg.success(' supression de la article d\'id: '+id);
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
    const article=new Article()
    article.marque=this.articleForm.controls['marque'].value
    article.image_pre=this.articleForm.controls['image_pre'].value
    article.nom=this.articleForm.controls['nom'].value
    article.prix=this.articleForm.controls['prix'].value
    article.offre=this.articleForm.controls['offre'].value
    article.livraison=this.articleForm.controls['livraison'].value
    article.transporteur=this.articleForm.controls['transporteur'].value
    article.descr=this.articleForm.controls['descr'].value
    article.type=this.articleForm.controls['type'].value
    article.code_paypal=this.articleForm.controls['code_paypal'].value
    article.old_prix=this.articleForm.controls['old_prix'].value
    this.ecritService.addArticle(article).subscribe(
      data => {
        console.log(article)
        this.msg.success('article ajouté');
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
