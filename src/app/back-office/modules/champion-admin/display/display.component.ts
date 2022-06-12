import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { ChampionsService } from 'src/app/back-office/services-backoffice/champions.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  size: NzSelectSizeType = 'large';
  listOfDisplayedAdmins:any;
  listOfAdmins:any;
  listOfDisplayedModifs:any;
  listOfModifs:any;
  listOfDisplayedImages:any;
  listOfImages:any;
  fallback =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==';
  imagesUrls="https://www.alljudo.net/images/galeries/24/"
  constructor(private dataProvider:ProviderService,private championService:ChampionsService,private msg: NzMessageService) { }

  ngOnInit(): void {
    this.dataProvider.getAllImagesDesc().subscribe(
      data => {
        this.listOfDisplayedImages=data
        this.listOfImages=data
        console.log("exemple d'image",data[0]);
        this.msg.info(data.length+' images chargées');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des  images: '+err.error);
      })
      this.championService.getAllChampionsAdminDesc().subscribe(
        data => {
          this.listOfDisplayedAdmins=data
          this.listOfAdmins=data
          console.log("exemple de champion admin",data[0]);
          this.msg.info(data.length+' champions admins externes chargées');
        },
        err => {
          this.msg.error('Erreur survenue lors du chargement des champions admins externes: '+err.error);
        })
        this.championService.getAllChampionsAdminDateModifDesc().subscribe(
          data => {
            this.listOfDisplayedModifs=data
            this.listOfModifs=data
            console.log("exemple de modif de champion admin",data[0]);
            this.msg.info(data.length+' Modifications champions admins externes chargées');
          },
          err => {
            this.msg.error('Erreur survenue lors du chargement des Modifications champions admins externes: '+err.error);
          })
  }

  //------------------------ Admins
  searchValue1 = '';
  visible1 = false;
  reset1(): void {
    this.searchValue1 = '';
    this.search1();
  }

  search1(): void {
    this.visible1 = false;
    this.listOfDisplayedAdmins = this.listOfAdmins.filter((item: any) => item.nom.indexOf(this.searchValue1) !== -1);
  }
  onCurrentPageDataChange1($event: any): void {
    this.listOfCurrentPageData1 = $event;
  }
  
  checked = false;
  indeterminate = false;
  listOfCurrentPageData1: any;
  setOfCheckedId = new Set<number>();

  //------------------------------- Modifs

  searchValue2 = '';
  visible2 = false;
  reset2(): void {
    this.searchValue2 = '';
    this.search2();
  }

  search2(): void {
    this.visible2 = false;
    this.listOfDisplayedModifs = this.listOfModifs.filter((item: any) => item.nom.indexOf(this.searchValue2) !== -1);
  }
  onCurrentPageDataChange2($event: any): void {
    this.listOfCurrentPageData2 = $event;
  }
  
  checked2 = false;
  indeterminate2 = false;
  listOfCurrentPageData2: any;
  setOfCheckedId2 = new Set<number>();

  //------------------------------- Images

  searchValue3 = '';
  visible3 = false;
  reset3(): void {
    this.searchValue3 = '';
    this.search3();
  }

  search3(): void {
    this.visible2 = false;
    this.listOfDisplayedImages = this.listOfImages.filter((item: any) => item.nom.indexOf(this.searchValue3) !== -1);
  }
  onCurrentPageDataChange3($event: any): void {
    this.listOfCurrentPageData3 = $event;
  }
  
  checked3 = false;
  indeterminate3 = false;
  listOfCurrentPageData3: any;
  setOfCheckedId3 = new Set<number>();

  //  -------------------------
  authoriser(pos:number){
    let demande=this.listOfDisplayedAdmins[pos]
    console.log("Validee ",demande)
    demande.actif==true
    demande.date_mod2=new Date()
    this.listOfDisplayedAdmins[pos].actif=true
    this.championService.updateChampion_admin_externe(demande.id,demande).subscribe(
      data=>{
        this.msg.success("demande acceptée avec success")
      },err=>{
        this.msg.error("erreur de modification survenue")
      }
    )
    
  }
  refuser(pos:number){
 let demande=this.listOfDisplayedAdmins[pos]
 console.log("Refusee ",demande)
 demande.date_mod2=new Date()
 demande.actif==false
    this.listOfDisplayedAdmins[pos].actif=false
    this.championService.updateChampion_admin_externe(demande.id,demande).subscribe(
      data=>{
        this.msg.success("demande refusée avec success")
      },err=>{
        this.msg.error("erreur de modification survenue")
      }
    )
  }

}
