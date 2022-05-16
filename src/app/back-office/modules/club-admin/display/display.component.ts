import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClubsService } from 'src/app/back-office/services-backoffice/clubs.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  listOfDisplayedData:any
  listOfData:any
  constructor(private clubService:ClubsService,private msg: NzMessageService) { }


  ngOnInit(): void {
    this.clubService.getAllClub_admin_externes().subscribe(
      data => {
        this.listOfDisplayedData=data
        this.listOfData=data
        console.log("exemple d'admin de club",data[0]);
        this.msg.info(data.length+' Admins chargées');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des  admins: '+err.error);
      })

  }
refuser(id:number){

}
autoriser(id:number){

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
}
