import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesModule } from '../sous-modules-annonce/categories/categories.module';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  annonces(){
    this.router.navigate(['main'],{relativeTo:this.route});
  }
  parametres(){
    this.router.navigate(['parametres'],{relativeTo:this.route});
  }
  sous_categories(){
    this.router.navigate(['sous-categories'],{relativeTo:this.route});
  }
categories(){
  this.router.navigate(['categories'],{relativeTo:this.route});
}
}
