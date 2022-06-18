import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  listOfDisplayedData: any;
  listOfData: any;

  constructor(private route: ActivatedRoute,private router: Router,private dataProvider:ProviderService,private eventService:EvenementsService,private msg: NzMessageService) { }


  ngOnInit(): void {
    this.dataProvider.getAllInvalidesEvenements().subscribe(
      data => {
        this.listOfData=data
        this.listOfDisplayedData=data
        console.log("exemple d'evenement non valide'",data[0]);
        this.msg.info(data.length+' evenements non valides chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des evenements non valides: '+err.error);
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

//---------- 

add(id:number){
  this.router.navigate(['admin/home/evenement/add/'+id]);

}
edit(id:number){
  this.router.navigate(['admin/home/evenement/edit/'+id]);
}
valider(id:number){

}
delete(id:number){
  this.eventService.delete(id).subscribe(
    data => {
      this.msg.success(' supression de l\'évenement d\'id: '+id);
      this.listOfDisplayedData = this.listOfData.filter((item: any) => item.id !==id);
      this.listOfData = this.listOfData.filter((item: any) => item.id !==id);

    },
    err => {
      this.msg.error('Erreur survenue lors de la supression : '+err.error);
    })
}


}
