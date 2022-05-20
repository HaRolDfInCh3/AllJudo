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
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  statusbanniere= StatusBanniere;
  taille=Tailles;
  listOfDisplayedData:any;
  hotTags = ['photos','judokas','technique','accueil', 'actualite', 'resultats', 'calendrier','videos','detente','annuaires','savoirs'];
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
  listOfData:any;
  submitForm(): void {
    const USER_KEY = 'utilisateur';
    const userString = JSON.parse(window.sessionStorage.getItem(USER_KEY)||"") ;
    let user = JSON.parse(userString);
    const banniere=new Bannieres_par_taille()
    banniere.nom=this.banniereForm.controls['nom'].value
    banniere.code=this.banniereForm.controls['code'].value
    banniere.image=this.banniereForm.controls['image'].value
    banniere.url=this.banniereForm.controls['url'].value
    banniere.actif=this.banniereForm.controls['actif'].value
    banniere.restriction=this.restrictions
    banniere.taille=this.banniereForm.controls['taille'].value
    console.log("formulairre",this.banniereForm.value);
    console.log("banniere",banniere);
    this.ecritService.addBannieres_par_taille(banniere).subscribe(
      data => {
        this.msg.success('banniere ajoutee');
        this.listOfData = [data].concat(this.listOfData)
       this.listOfDisplayedData = [data].concat(this.listOfDisplayedData)
      },
      err => {
        console.log("erreur survenue lors de l'ajout");
        this.msg.error("erreur survenue lors de l'ajout");
      }
    );
    
  }

  constructor(private dataProvider:ProviderService,private fb: FormBuilder,private router: Router,private msg: NzMessageService,private ecritService:EcritureService,private route: ActivatedRoute) {
    

    
  }

  ngOnInit(): void {
    this.banniereForm = this.fb.group({
      nom: [null, [Validators.required]],
      code: [null, [Validators.required]],
      image: [null, [Validators.required]],
      url: [null, [Validators.required]],
      actif: [null, [Validators.required]],
      taille: [null, [Validators.required]],
    });
    this.dataProvider.getAllBannieres_par_tailles().subscribe(
      data => {
        this.listOfDisplayedData=data
        this.listOfData=data
        console.log("exemple de banniere",data[0]);
        this.msg.info(data.length+' banniere chargées');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des banniere: '+err.error);
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
    this.listOfDisplayedData = this.listOfData.filter((item: any) => item.taille.indexOf(this.searchValue) !== -1);
  }
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any;
  setOfCheckedId = new Set<number>();
  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
  }
  delete(id:number){
    this.ecritService.deleteBannieres_par_taille(id).subscribe(
      data => {
        this.msg.success(' supression de la banniere d\'id: '+id);
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
  selectedTags: string[] = [];
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
