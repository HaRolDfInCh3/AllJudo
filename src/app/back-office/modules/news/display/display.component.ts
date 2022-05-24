import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { News } from 'src/app/back-office/models/classes/News';
import { typeNews } from 'src/app/back-office/models/enums/typeNews';
import {NewsService} from '../../../services-backoffice/news.service'
import {EvenementsService} from '../../../services-backoffice/evenements.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})

export class DisplayComponent implements OnInit {
  typenews= typeNews;
  listOfDisplayedData:any;
  types() : Array<string> {
    var keys = Object.keys(this.typenews);
    return keys.slice(keys.length / 2);
}
  newsForm!: FormGroup;
  evenements: Array<any> = [];
  newscategories: Array<any> = [];
  size: NzSelectSizeType = 'large';
  listOfData:any;
  submitForm(): void {
    const USER_KEY = 'utilisateur';
    const userString = JSON.parse(window.sessionStorage.getItem(USER_KEY)||"") ;
    let user = JSON.parse(userString);
    const news=new News()
    news.aLaUne=this.newsForm.controls['alaune'].value
    news.aLaDeux=this.newsForm.controls['aladeux'].value
    news.categorieID=this.newsForm.controls['newscategorie'].value
    news.evenementID=this.newsForm.controls['evenement'].value
    news.photo=this.newsForm.controls['photo'].value
    news.source=this.newsForm.controls['source'].value
    news.admin=user.userName
    news.titre=this.newsForm.controls['titre'].value
    news.titre_en=this.newsForm.controls['titre_en'].value
    news.date=this.newsForm.controls['date'].value
    news.textlien1=this.newsForm.controls['texte_lien1'].value
    news.lien1=this.newsForm.controls['lien1'].value
    news.textlien2=this.newsForm.controls['texte_lien2'].value
    news.texte=this.newsForm.controls['texte'].value
    news.textlien2=this.newsForm.controls['texte_lien2'].value
    news.nom=this.newsForm.controls['nom'].value
    news.url=this.newsForm.controls['url'].value
    news.lien2=this.newsForm.controls['lien2'].value
    news.textlien3=this.newsForm.controls['texte_lien3'].value
    news.lien3=this.newsForm.controls['lien3'].value
    news.chapo=this.newsForm.controls['chapo'].value
    news.legende=this.newsForm.controls['legende'].value
    news.type=this.newsForm.controls['type'].value
    console.log("formulairre",this.newsForm.value);
    console.log("news",news);
    this.newsService.addNews(news).subscribe(
      data => {
        this.msg.success('news ajoutee');
      },
      err => {
        console.log("erreur survenue lors de l'ajout");
        this.msg.error("erreur survenue lors de l'ajout");
      }
    );
  }

  constructor(private dataProvider:ProviderService,private fb: FormBuilder,private router: Router,private msg: NzMessageService,private newsService:NewsService,private evenS:EvenementsService,private route: ActivatedRoute) {
    

    
  }

  ngOnInit(): void {
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
      nom: [null, ],
      url: [null,],
      legende: [null],
      lien1: [null, ],
      texte_lien1: [null, ],
      lien2: [null],
      texte_lien2: [null],
      lien3: [null],
      newscategorie:[null],
      texte_lien3: [null],
      evenement: [null,],
      photo: [null],
    });
    this.newsService.getAllNews().subscribe(
      data => {
        this.listOfDisplayedData=data
        this.listOfData=data
        console.log("exemple de news",data[0]);
        this.msg.info(data.length+' News chargées');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des news: '+err.error);
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
  searchValue = '';
  visible = false;
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayedData = this.listOfData.filter((item: any) => item.titre.indexOf(this.searchValue) !== -1);
  }
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any;
  setOfCheckedId = new Set<number>();
  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
  }
  delete(id:number){
    this.newsService.delete(id).subscribe(
      data => {
        this.msg.success(' supression de la news d\'id: '+id);
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
  

}
