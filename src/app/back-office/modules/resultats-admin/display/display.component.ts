import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { ChampionsService } from 'src/app/back-office/services-backoffice/champions.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  listOfData:any;
  listOfDisplayedData:any;
  size: NzSelectSizeType = 'large';
  constructor(private caepService:ChampionsService,private msg:NzMessageService,private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.caepService.getAllChampionsAdminPalmaresDesc().subscribe(
      data => {
        this.listOfDisplayedData=data
        this.listOfData=data
        console.log("exemple de resultat administré",data[0]);
        this.msg.info(data.length+'resultats chargées');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des resultats: '+err.error);
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
    this.listOfDisplayedData= this.listOfData.filter((item: any) => item.nom.indexOf(this.searchValue) !== -1);
  }
  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
  }
  
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any;
  setOfCheckedId = new Set<number>();

  delete(id:number){
    this.caepService.deleteChampion_admin_externe_palmares(id).subscribe(
      data => {
        this.msg.success(' supression du resultat administré d\'id: '+id);
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
}
