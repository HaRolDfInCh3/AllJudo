import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import {NewsService} from '../../../services-backoffice/news.service'
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  newsForm!: FormGroup;
  types: Array<{ label: string; value: string }> = [];
  evenements: Array<{ label: string; value: string }> = [];
  size: NzSelectSizeType = 'large';
  listOfData:any;
  submitForm(): void {
    console.log(this.newsForm.value);
    this.msg.success('News crée avec succès !');
  }

  constructor(private fb: FormBuilder,private msg: NzMessageService,private newsService:NewsService) {
    

    
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
        this.msg.error('Erreur survenue: '+err.error);
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
