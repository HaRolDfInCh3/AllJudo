import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Annonce } from 'src/app/back-office/models/classes/Annonce';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  size: NzSelectSizeType = 'large';
  listOfDisplayedData: any;
  listOfData: any;
  listeSouscategories:any
  annonceForm!: FormGroup;
  listePays:any
  constructor(private route: ActivatedRoute,private router: Router,private dataProvider:ProviderService,private fb: FormBuilder,private ecritService:EcritureService,private msg: NzMessageService) { }

  ngOnInit(): void {
    this.annonceForm = this.fb.group({
      sous_categorie_ID: [null, [Validators.required]],
      descriptif: [null, [Validators.required]],
      titre: [null,[Validators.required]],
      mail: [null, [Validators.required]],
      nom: [null,[Validators.required] ],
      code_postal: [null, ],
      ville: [null, [Validators.required]],
      pays: [null,[Validators.required] ],
      telephone: [null, ],
    });

    this.dataProvider.getAllAnnoncesDesc().subscribe(
      data => {
        
        this.listOfData=data
        this.listOfDisplayedData=data
        console.log("exemple de annonce",data[0]);
        this.msg.info(data.length+' annonces chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des annonces: '+err.error);
      })
      
        this.dataProvider.getAllSous_categories().subscribe(
          data => {
            
            this.listeSouscategories=data
            console.log("exemple de sous categorie",data[0]);
            this.msg.info(data.length+' sous categories chargés');
          },
          err => {
            this.msg.error('Erreur survenue lors du chargement des sous categories: '+err.error);
          })

          this.dataProvider.getAllpays().subscribe(
            data => {
              
              this.listePays=data
              console.log("exemple de pays",data[0]);
              this.msg.info(data.length+' pays chargés');
            },
            err => {
              this.msg.error('Erreur survenue lors du chargement des pays: '+err.error);
            })
  }
//-------------- filtre

  searchValue = '';
visible = false;
reset(): void {
this.searchValue = '';
this.search();
}

search(): void {
this.visible = false;
this.listOfDisplayedData = this.listOfData.filter((item: any) => item.descriptif.indexOf(this.searchValue) !== -1);
}
onCurrentPageDataChange($event: any): void {
this.listOfCurrentPageData = $event;
}

checked = false;
indeterminate = false;
listOfCurrentPageData: any;
setOfCheckedId = new Set<number>();


delete(id:number){
  this.ecritService.deleteAnnonce(id||0).subscribe(
    data => {
      this.msg.success(' annonce supreimee');
      
      this.listOfDisplayedData = this.listOfData.filter((item: any) => item.id !==id);
      this.listOfData = this.listOfData.filter((item: any) => item.id !==id);
    },
    err => {
      this.msg.error('Erreur survenue lors de la supression de l annonce: '+err.error);
    })
}
edit(id:number){
  this.router.navigate(['edit/'+id],{relativeTo:this.route});
}

submitForm(){
  const USER_KEY = 'utilisateur';
  const userString = JSON.parse(window.sessionStorage.getItem(USER_KEY)||"") ;
  let user = JSON.parse(userString);
  const annonce=new Annonce()  
  annonce.date_publication=new Date()
  annonce.date_modification=new Date()
  annonce.mail=this.annonceForm.controls["mail"].value
  annonce.descriptif=this.annonceForm.controls["descriptif"].value
  annonce.telephone=this.annonceForm.controls["telephone"].value
  annonce.titre=this.annonceForm.controls["titre"].value
  annonce.nom=this.annonceForm.controls["nom"].value
  annonce.code_postal=this.annonceForm.controls["code_postal"].value
  annonce.ville=this.annonceForm.controls["ville"].value
  annonce.valide=true
  annonce.login=user.userName
  annonce.premium=false
  annonce.sous_categorie_ID=this.annonceForm.controls["sous_categorie_ID"].value
  //annonce.user_ID=this.annonceForm.controls["user_ID"].value
  annonce.pays=this.annonceForm.controls["pays"].value
  console.log(annonce)
  this.ecritService.addAnnonce(annonce).subscribe(
    data => {
      this.msg.success(' annonce ajoutee');
      console.log("recu :",data)
      this.listOfData = [data].concat(this.listOfData)
      this.listOfDisplayedData = [data].concat(this.listOfDisplayedData)
    },
    err => {
      this.msg.error('Erreur survenue lors de l\'ajout de l annonce: '+err.error);
    })
}

}
