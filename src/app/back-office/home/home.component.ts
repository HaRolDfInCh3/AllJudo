import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
user=JSON.parse(localStorage.getItem("utilisateur")||"")
  constructor() { }

  ngOnInit(): void {
    console.log(this.user)
  }

}
