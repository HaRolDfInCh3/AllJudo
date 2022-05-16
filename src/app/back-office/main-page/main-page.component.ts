import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StockageJwtService } from '../services-backoffice/stockage-jwt.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  src = `../../assets/images/logoSite.PNG`;
  constructor(private router: Router,private msg: NzMessageService,private tokenService: StockageJwtService) { }

  ngOnInit(): void {
  }
  seDeconnecter(){
    this.msg.info('revenez nous vite !');
    this.router.navigate(['/admin/',]);
    this.tokenService.signOut();
  }
  base="/admin/home/"
  news(){
    this.router.navigate([this.base+'news',]);
  }
  evenement(){
    this.router.navigate([this.base+'evenement',]);
  }
  evenementImportant(){
    this.router.navigate([this.base+'evenementImportant',]);
  }
  script(){
    this.router.navigate([this.base+'script',]);
  }
  annonces(){
    this.router.navigate([this.base+'annonces',]);
  }
  stats(){
    this.router.navigate([this.base+'stats',]);
  }
  pari(){
    this.router.navigate([this.base+'pari',]);
  }
  pub(){
    this.router.navigate([this.base+'pub',]);
  }
  boutiqueCommentaire(){
    this.router.navigate([this.base+'boutiqueCommentaire',]);
  }
  boutique(){
    this.router.navigate([this.base+'boutique',]);
  }
  technique(){
    this.router.navigate([this.base+'technique',]);
  }
  commentaire(){
    this.router.navigate([this.base+'commentaire',]);
  }
  validation(){
    this.router.navigate([this.base+'validation',]);
  }
  video(){
    this.router.navigate([this.base+'video',]);
  }
  galerie(){
    this.router.navigate([this.base+'galerie',]);
  }
  clubAdmin(){
    this.router.navigate([this.base+'clubAdmin',]);
  }
  club(){
    this.router.navigate([this.base+'club',]);
  }
  resultatsAdmin(){
    this.router.navigate([this.base+'resultatsAdmin',]);
  }
  championAdmin(){
    this.router.navigate([this.base+'championAdmin',]);
  }
  champion(){this.router.navigate([this.base+'champion',]);}
  direct(){this.router.navigate([this.base+'direct',]);}

}
