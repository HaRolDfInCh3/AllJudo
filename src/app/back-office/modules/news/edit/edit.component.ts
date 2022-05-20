import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { News } from 'src/app/back-office/models/classes/News';
import { typeNews } from 'src/app/back-office/models/enums/typeNews';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';
import { NewsService } from 'src/app/back-office/services-backoffice/news.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id?: number;
  newsForm!: FormGroup;
  evenements: Array<any> = [];
  newscategories: Array<any> = [];
  size: NzSelectSizeType = 'large';
  typenews= typeNews;
  currentNews: any;
  types() : Array<string> {
    var keys = Object.keys(this.typenews);
    return keys.slice(keys.length / 2);
}

  constructor(private dataProvider:ProviderService,private route: ActivatedRoute,private fb: FormBuilder,private msg: NzMessageService,private newsService:NewsService,private evenS:EvenementsService) { }

  ngOnInit(): void {
    //read parameters here
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
  });
  this.newsForm = this.fb.group({
    alaune: [null, [Validators.required]],
    aladeux: [null, [Validators.required]],
    date: [null, [Validators.required]],
    source: [null, [Validators.required]],
    titre: [null, [Validators.required]],
    titre_en: [null],
    chapo: [null, [Validators.required]],
    texte: [null, [Validators.required]],
    liens_champions: [null],
    type: [null, [Validators.required]],
    nom: [null, [Validators.required]],
    url: [null, [Validators.required]],
    legende: [null],
    lien1: [null, [Validators.required]],
    texte_lien1: [null, [Validators.required]],
    lien2: [null],
    texte_lien2: [null],
    lien3: [null],
    newscategorie:[null],
    texte_lien3: [null],
    evenement: [null, [Validators.required]],
    photo: [null],
  });
  this.newsService.getNews(this.id||0).subscribe(
    data => {
      this.currentNews=data
      this.newsForm.controls['alaune'].patchValue( this.currentNews.alaUne);
      this.newsForm.controls['aladeux'].patchValue(this.currentNews.alaDeux);
      this.newsForm.controls['legende'].patchValue(this.currentNews.legende);
      this.newsForm.controls['texte'].patchValue(this.currentNews.texte);
      this.newsForm.controls['liens_champions'].patchValue(this.currentNews.liens_champions);
      this.newsForm.controls['nom'].patchValue(this.currentNews.nom);
      this.newsForm.controls['url'].patchValue(this.currentNews.url);
      this.newsForm.controls['titre_en'].patchValue(this.currentNews.titre_en);
      this.newsForm.controls['titre'].patchValue(this.currentNews.titre);
      this.newsForm.controls['date'].patchValue(new Date(this.currentNews.date));
      this.newsForm.controls['source'].patchValue(this.currentNews.source);
      //le champ photo n'y est pas car il ne sera pas affiché
      this.newsForm.controls['lien1'].patchValue(this.currentNews.lien1);
      this.newsForm.controls['texte_lien1'].patchValue(this.currentNews.textlien1);
      this.newsForm.controls['lien2'].patchValue(this.currentNews.lien2);
      this.newsForm.controls['texte_lien2'].patchValue(this.currentNews.textlien2);
      this.newsForm.controls['lien3'].patchValue(this.currentNews.lien3);
      this.newsForm.controls['texte_lien3'].patchValue(this.currentNews.textlien3);
      this.newsForm.controls['type'].patchValue(this.currentNews.type);
      this.newsForm.controls['chapo'].patchValue(this.currentNews.chapo);
      this.newsForm.controls['evenement'].patchValue(this.currentNews.evenementID);
      this.newsForm.controls['newscategorie'].patchValue(this.currentNews.categorieID);
      console.log("news chargee",this.newsForm.value);
      this.msg.info(' News d\''+this.id+' chargée');
    },
    err => {
      this.msg.error('Erreur survenue lors du chargement de la news: '+err.error);
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
      this.dataProvider.getAllNewsCategories().subscribe(
        data => {
          
          this.newscategories=data
          console.log("exemple de categorie de news",data[0]);
          this.msg.info(data.length+' categories de news chargées');
        },
        err => {
          this.msg.error('Erreur survenue lors du chargement des categories de news: '+err.error);
        })
  }
  updateNews(){
    const news=new News()
    news.aLaUne=this.newsForm.controls['alaune'].value
    news.aLaDeux=this.newsForm.controls['aladeux'].value
    news.categorieID=this.newsForm.controls['newscategorie'].value
    news.evenementID=this.newsForm.controls['evenement'].value
    news.source=this.newsForm.controls['source'].value
    news.date=this.newsForm.controls['date'].value
    news.photo=this.newsForm.controls['photo'].value||this.currentNews.photo
    news.admin=this.currentNews.admin
    news.texte=this.newsForm.controls['texte'].value
    news.titre=this.newsForm.controls['titre'].value
    news.titre_en=this.newsForm.controls['titre_en'].value
    news.textlien1=this.newsForm.controls['texte_lien1'].value
    news.lien1=this.newsForm.controls['lien1'].value
    news.nom=this.newsForm.controls['nom'].value
    news.url=this.newsForm.controls['url'].value
    news.textlien2=this.newsForm.controls['texte_lien2'].value
    news.lien2=this.newsForm.controls['lien2'].value
    news.textlien3=this.newsForm.controls['texte_lien3'].value
    news.lien3=this.newsForm.controls['lien3'].value
    news.legende=this.newsForm.controls['legende'].value
    news.chapo=this.newsForm.controls['chapo'].value
    news.type=this.newsForm.controls['type'].value
    this.newsService.updateNews(this.currentNews.id,news).subscribe(
      data => {
        console.log(news)
        this.msg.success('news mise a jour');
      },
      err => {
        console.log("erreur survenue lors de la mise a jour");
        this.msg.error("erreur survenue lors de la mise a jour");
      }
    );
  }

  

}
