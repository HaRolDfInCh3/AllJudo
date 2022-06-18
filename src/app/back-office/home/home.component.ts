import { Component, OnInit } from '@angular/core';
import {StockageJwtService} from '../services-backoffice/stockage-jwt.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //user=JSON.parse(localStorage.getItem("utilisateur")||"")
  user:any
  constructor(private stockage:StockageJwtService) { }

  ngOnInit(): void {
    if(!this.stockage.getUser()==false){
       this.user=JSON.parse(this.stockage.getUser()||"")
    console.log(this.user)
    }
   
  }

}
