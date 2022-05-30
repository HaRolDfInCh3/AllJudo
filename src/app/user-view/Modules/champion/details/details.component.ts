import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { ChampionsService } from 'src/app/back-office/services-backoffice/champions.service';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';

import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { PublicitesService } from 'src/app/user-view/services/publicites.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private eventService:EvenementsService,private championService:ChampionsService,private pubService:PublicitesService,private router: Router,private msg: NzMessageService,private dataProvider:ProviderService) { }
url?:string
id?:number
championAffiche:any//ce qui est a l'ecran
listOfData:any;
listOfDisplayedData:any;
lienspubs?:string


size: NzSelectSizeType = 'default';
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
      
  });

    this.lienspubs=this.dataProvider.getLiensPubs()
    this.pubService.getRandomBanniere_par_taille("300x250").subscribe(
      data => {
        console.log(data)
        if(data.image){
          this.url=this.lienspubs+data.image
        }
        
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation de la banniere")
        console.log("erreur survenue lors de la recuperation de la banniere");
      }
    );
    this.championService.getChampion(this.id||0).subscribe(
      data => {
       this.championAffiche=data
       console.log("Champion: ",data)
        this.msg.success("Données champion recuperées");
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des infos champion")
        console.log("erreur survenue lors de la recuperation des infos champion");
      }
    );
    this.eventService.getPalmaresById(722).subscribe(
      data => {
        this.listOfDisplayedData=data
        this.listOfData=data
        console.log("exemple de palmares",data[0]);
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement du palmares: '+err.error);
      })

   
  }
  
  
  resultatsEvenement(id:number){
    //this.router.navigate(['details/'+id],{relativeTo:this.route});
  }

currentDate = new Date();
calculateDiff(dateSent:Date){
  
  dateSent = new Date(dateSent);

  return Math.floor((this.currentDate.getFullYear()) - (dateSent.getFullYear()) ) ;
}

//recherche par categorie age dans le palmares

catAge = '';
visible = false;
reset(): void {
  this.catAge = '';
  this.search();
}

search(): void {
  this.visible = false;
  this.listOfDisplayedData= this.listOfData.filter((item: any) => item.categorie_age.indexOf(this.catAge) !== -1);
}
onCurrentPageDataChange($event: any): void {
  this.listOfCurrentPageData = $event;
}

checked = false;
indeterminate = false;
listOfCurrentPageData: any;



catEvent = '';
visible2 = false;
reset2(): void {
  this.catEvent = '';
  this.search2();
}

search2(): void {
  this.visible2 = false;
  this.listOfDisplayedData= this.listOfData.filter((item: any) => item.categorie_evenement.indexOf(this.catEvent) !== -1);
}
onCurrentPageDataChange2($event: any): void {
  this.listOfCurrentPageData2 = $event;
}

checked2 = false;
indeterminate2 = false;
listOfCurrentPageData2: any;

}

