import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ParametresBatch } from 'src/app/back-office/models/classes/ParametresBatch';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  validite_premium?:number
  validite_normal?:number
  listOfData: any;
  listOfDisplayedData: any;
  constructor(private dataProvider:ProviderService,private msg:NzMessageService,private ecritService:EcritureService) { }

  ngOnInit(): void {
    this.dataProvider.getAllParametresBatchs().subscribe(
      data => {
        this.listOfData=data
        this.listOfDisplayedData=data
        console.log("exemple de ParametresBatch",data[0]);
        this.msg.info(data.length+' ParametresBatchs chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des ParametresBatchs: '+err.error);
      })
  }
  valide():boolean{
    if(this.validite_normal && this.validite_premium){
        return false
    }
    return true
  }
  modifier(){
    const USER_KEY = 'utilisateur';
    const userString = JSON.parse(window.sessionStorage.getItem(USER_KEY)||"") ;
    let user = JSON.parse(userString);
    const parametre=new ParametresBatch()
    parametre.date_creation=new Date()
    parametre.validite_normal=this.validite_normal
    parametre.validite_premium=this.validite_premium
    parametre.login=user.userName
    this.ecritService.addParametresBatch(parametre).subscribe(
      data => {
        console.log(parametre)
    this.msg.success("parametres envoyés au serveur");
      },
      err => {
        console.log("erreur survenue lors de l'ajout");
        this.msg.error("erreur survenue lors de l'ajout");
      }
    );
    
  }

   //-------------- filtre

 
   onCurrentPageDataChange($event: any): void {
   this.listOfCurrentPageData = $event;
   }
  
   listOfCurrentPageData: any;
delete(id:number){
  this.ecritService.deleteParametresBatch(id||0).subscribe(
    data => {
      this.msg.success('Parametre Batch supprime');
      
      this.listOfDisplayedData = this.listOfData.filter((item: any) => item.id !==id);
      this.listOfData = this.listOfData.filter((item: any) => item.id !==id);
    },
    err => {
      this.msg.error('Erreur survenue lors de la supression du Parametre: '+err.error);
    })
}
   


}
