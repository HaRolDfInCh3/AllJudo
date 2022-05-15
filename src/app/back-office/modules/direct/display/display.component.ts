import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { EvenementsService } from 'src/app/back-office/services-backoffice/evenements.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  constructor(private router: Router,private route:ActivatedRoute,private msg: NzMessageService,private evenementImportantService:EvenementsService) {
    
  }
  
  types: Array<{ label: string; value: string }> = [];
  evenementImportants: Array<{ label: string; value: string }> = [];
  size: NzSelectSizeType = 'large';
  evenements:any;
  listOfData:any;
  listOfDisplayedData:any;
  

  ngOnInit(): void {
   
    this.evenementImportantService.getAllEvenementImportants().subscribe(
      data => {
        
        this.listOfData=data
        this.listOfDisplayedData=data
        console.log("exemple de evenementImportants",data[0]);
        this.msg.info(data.length+' evenementImportants chargées');
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
    this.listOfDisplayedData = this.listOfData.filter((item: any) => item.nom.indexOf(this.searchValue) !== -1);
  }
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any;
  setOfCheckedId = new Set<number>();
  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
  }

 
  edit(id:number){
    this.router.navigate(['edit/'+id],{relativeTo:this.route});
  }

  live(id:number){
    this.router.navigate(['live/'+id],{relativeTo:this.route});
  }
  

}