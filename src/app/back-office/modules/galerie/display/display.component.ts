import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Galerie } from 'src/app/back-office/models/classes/Galerie';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  listOfDisplayedData:any
  listOfData:any
  listeEvents:any
  size: NzSelectSizeType = 'large';
  galerieForm!: FormGroup;
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private router: Router,private dataProvider:ProviderService,private ecritService:EcritureService,private msg: NzMessageService) { }
 

  ngOnInit(): void {
    this.galerieForm = this.fb.group({
      titre: [null, [Validators.required]],
      titre_en: [null, ],
      date: [null, [Validators.required]],
      photographe: [null, ],
      evenement_id: [null,[Validators.required]],
      admin: [null],
      lien: [null],
      
    });
    this.dataProvider.getAllEvenements().subscribe(
      data => {
        
        this.listeEvents=data
        console.log("exemple d'evenement'",data[0]);
        this.msg.info(data.length+' evenements chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des evenements: '+err.error);
      })
      this.dataProvider.getAllGaleries().subscribe(
        data => {
          this.listOfData=data
          this.listOfDisplayedData=data
          console.log("exemple de galerie",data[0]);
          this.msg.info(data.length+' galeries chargés');
        },
        err => {
          this.msg.error('Erreur survenue lors du chargement des galeries: '+err.error);
        })
  }

  edit(id:number){
    this.router.navigate(['edit/'+id],{relativeTo:this.route});
  }
  delete(id:number){
    this.ecritService.deleteGalerie(id).subscribe(
      data => {
        this.msg.success(' supression de la galerie d\'id: '+id);
        this.listOfDisplayedData = this.listOfData.filter((item: any) => item.id !==id);
        this.listOfData = this.listOfData.filter((item: any) => item.id !==id);

      },
      err => {
        this.msg.error('Erreur survenue lors de la supression : '+err.error);
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
  this.listOfDisplayedData = this.listOfData.filter((item: any) => item.nom.indexOf(this.searchValue) !== -1);
}
onCurrentPageDataChange($event: any): void {
  this.listOfCurrentPageData = $event;
}

checked = false;
indeterminate = false;
listOfCurrentPageData: any;
setOfCheckedId = new Set<number>();


submitForm(){
  const USER_KEY = 'utilisateur';
    const userString = JSON.parse(window.sessionStorage.getItem(USER_KEY)||"") ;
    let user = JSON.parse(userString);
  const galerie=new Galerie()
  galerie.titre=this.galerieForm.controls['titre'].value
  galerie.titre_en=this.galerieForm.controls['titre_en'].value
  galerie.date=this.galerieForm.controls['date'].value
  galerie.photographe=this.galerieForm.controls['photographe'].value
  galerie.evenement_id=this.galerieForm.controls['evenement_id'].value
  galerie.lien=this.galerieForm.controls['lien'].value
  galerie.admin=user.userName
  console.log(galerie)
  this.ecritService.addGalerie(galerie).subscribe(
    data => {
      this.msg.success(' galerie ajoutee');
    },
    err => {
      this.msg.error('Erreur survenue lors de l\'ajout de la galerie: '+err.error);
    })
}

}
