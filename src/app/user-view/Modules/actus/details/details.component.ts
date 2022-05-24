import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NewsService } from 'src/app/back-office/services-backoffice/news.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { PublicitesService } from 'src/app/user-view/services/publicites.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id?:number
  currentNews:any
  latestNews:any
  lienspubs?:string
  url?:string
  liensNews2022?: string;
  constructor(private route: ActivatedRoute,private router: Router,private newsService:NewsService,private pubService:PublicitesService,private msg: NzMessageService,private dataProvider:ProviderService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
  });
  this.liensNews2022=this.dataProvider.getLiensNews2022()
  this.newsService.getNews(this.id||0).subscribe(
    data => {
     this.currentNews=data
     console.log("news",data)
    },
    err => {
      this.msg.error("erreur survenue lors de la recuperation ")
      console.log("erreur survenue lors de la recuperation ");
    }
  );
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

    this.newsService.getLatestNews().subscribe(
      data => {
       this.latestNews=data
       console.log("latest news",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des derniers news droites")
        console.log("erreur survenue lors de la recuperation des derniers news droites");
      }
    );
  }

  detailsGauche(id:number,position:number){
    console.log(position)
    let element=this.latestNews[position]
    if(element.newscategorie2?.intitule=="Videos" ||element.newscategorie2?.intitule=="Photos"||element.newscategorie2?.intitule=="Articles sponsorisés"){
      this.msg.error("pas implementé")
    }else{
     // console.log("intitule",element.newscategorie2?.intitule)
      this.router.navigate(['details/'+id],{relativeTo:this.route});
    }
    
  }

}