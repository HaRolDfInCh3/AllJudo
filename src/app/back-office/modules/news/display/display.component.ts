import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { News } from 'src/app/back-office/models/classes/News';
import { typeNews } from 'src/app/back-office/models/enums/typeNews';
import {NewsService} from '../../../services-backoffice/news.service'
import {EvenementsService} from '../../../services-backoffice/evenements.service'
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})

export class DisplayComponent implements OnInit {
  typeNews: typeof typeNews = typeNews;
  newsForm!: FormGroup;
  evenements: Array<any> = [];
  size: NzSelectSizeType = 'large';
  listOfData:any;
  submitForm(): void {
    const USER_KEY = 'utilisateur';
    const user = window.sessionStorage.getItem(USER_KEY);
    const news=new News()
    news.aLaUne=this.newsForm.controls['alaune'].value
    news.aLaDeux=this.newsForm.controls['aladeux'].value
    news.admin=user
    news.idMongo="nouvelle"
    news.id=1
    news.date=this.newsForm.controls['alaune'].value
    console.log(this.newsForm.value);
    this.newsService.addNews(news).subscribe(
      data => {
        console.log(data);
        this.msg.success('news ajoutee');
      },
      err => {
        console.log("erreur survenue lors de l'ajout");
        this.msg.error("erreur survenue lors de l'ajout");
      }
    );
    this.msg.success('News crée avec succès !');
  }

  constructor(private fb: FormBuilder,private msg: NzMessageService,private newsService:NewsService,private evenS:EvenementsService) {
    

    
  }

  ngOnInit(): void {
    this.newsForm = this.fb.group({
      alaune: [null, [Validators.required]],
      aladeux: [null, [Validators.required]],
      date: [null, [Validators.required]],
      source: [null, [Validators.required]],
      titre: [null, [Validators.required]],
      english_title: [null],
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
      texte_lien3: [null],
      evenement: [null, [Validators.required]],
      photo: [null],
    });
    this.newsService.getAllNews().subscribe(
      data => {
        
        this.listOfData=data
        console.log("exemple de news",data[0]);
        this.msg.info(data.length+' News chargées');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des news: '+err.error);
      })
      this.evenS.getAllCategorieEvenements().subscribe(
        data => {
          
          this.evenements=data
          console.log("exemple d'evenement",data[0]);
          this.msg.info(data.length+' categories evenements chargées');
        },
        err => {
          this.msg.error('Erreur survenue lors du chargement des categories: '+err.error);
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
    this.listOfData = this.listOfData.filter((item: any) => item.titre.indexOf(this.searchValue) !== -1);
  }
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any;
  setOfCheckedId = new Set<number>();
  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
  }
  

}
