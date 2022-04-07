import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';

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

  constructor(private fb: FormBuilder,private msg: NzMessageService) {
    const children: Array<{ label: string; value: string }> = [];
    children.push({ label: "Articles", value: "Articles" });
    children.push({ label: "Articles Sponsorisés", value: "Articles Sponsorisés" });
    children.push({ label: "Autres", value: "Autres" });
    children.push({ label: "Blogs", value: "Blogs" });
    children.push({ label: "Breve", value: "Breve" });
    children.push({ label: "Conseils", value: "Conseils" });
    children.push({ label: "FFJDA", value: "FFJDA" });
    children.push({ label: "international", value: "international" });
    children.push({ label: "Interview", value: "Interview" });
    children.push({ label: "Photos", value: "Photos" });
    this.types = children;

    const children2: Array<{ label: string; value: string }> = [];
    children2.push({ label: "Coupe de France 3e division", value: "Coupe de France 3e division" });
    children2.push({ label: "Tournoi Super A", value: "Tournoi Super As" });
    children2.push({ label: "Championnats de France de la Police", value: "Championnats de France de la Police" });
    children2.push({ label: "Asian Open", value: "Asian Open" });
    children2.push({ label: "Championnats de France Universitaires kyus", value: "Championnats de France Universitaires kyus" });
    children2.push({ label: "Jeux des Petits Etats Européens", value: "Jeux des Petits Etats Européens" });
    children2.push({ label: "European Club Championships", value: "FFJDA" });
    children2.push({ label: "European Club Judo Championships - Champions Leagu...", value: "European Club Judo Championships - Champions Leagu..." });
    children2.push({ label: "Panamerican Cup", value: "Panamerican Cup" });
    children2.push({ label: "Jeux Africains", value: "Jeux Africains" });
    this.evenements = children2;
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

    this.listOfData = new Array(200).fill(0).map((_, index) => ({
      id: index,
      name: `Top 10 Juji-gatame Compilation ${index}`,
      une: 'Oui',
      deux: 'Non',
      date: new Date()
    }));

  }
  searchValue = '';
  visible = false;
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfData = this.listOfData.filter((item: any) => item.name.indexOf(this.searchValue) !== -1);
  }
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any;
  setOfCheckedId = new Set<number>();
  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
  }
  

}
