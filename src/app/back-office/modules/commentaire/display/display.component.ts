import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  listOfDisplayedData: any;
  listOfData: any;

  constructor(private dataProvider:ProviderService,private msg: NzMessageService) { }

  ngOnInit(): void {
    this.dataProvider.getLastCommentaires().subscribe(
      data => {
        this.listOfData=data
        this.listOfDisplayedData=data
        console.log("exemple de commentaire",data[0]);
        this.msg.info(data.length+' commentaires chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des commentaires: '+err.error);
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
this.listOfDisplayedData = this.listOfData.filter((item: any) => item.commentaire.indexOf(this.searchValue) !== -1);
}
onCurrentPageDataChange($event: any): void {
this.listOfCurrentPageData = $event;
}

checked = false;
indeterminate = false;
listOfCurrentPageData: any;
setOfCheckedId = new Set<number>();
}
