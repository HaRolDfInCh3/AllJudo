import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Club } from 'src/app/back-office/models/classes/Club';
import { ClubsService } from 'src/app/back-office/services-backoffice/clubs.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  listeDepartement:any
  listePays:any
  listOfDisplayedData:any
  listOfData:any
  clubForm!: FormGroup;
  size: NzSelectSizeType = 'large';
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private router: Router,private dataProvider:ProviderService,private clubService:ClubsService,private msg: NzMessageService) { }

  ngOnInit(): void {
    this.clubForm = this.fb.group({
      pays: [null, [Validators.required]],
      departement: [null, ],
      club: [null, [Validators.required]],
      responsable: [null,[Validators.required] ],
      telephone: [null,],
      mel: [null],
      site: [null],
      description: [null],
      ville: [null],
      cP: [null],
      adresse: [null],
      gcoo1: [null],
      gcoo2: [null],
      gaddress: [null],
      valide: [null],
    });
    this.dataProvider.getAllpays().subscribe(
      data => {
        
        this.listePays=data
        console.log("exemple de pays",data[0]);
        this.msg.info(data.length+' pays chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des  pays: '+err.error);
      })
      this.dataProvider.getAllDepartements().subscribe(
        data => {
          
          this.listeDepartement=data
          console.log("exemple de departement",data[0]);
          this.msg.info(data.length+' departement chargés');
        },
        err => {
          this.msg.error('Erreur survenue lors du chargement des  departement: '+err.error);
        })
        this.clubService.getAllClubs().subscribe(
          data => {
            this.listOfData=data
            this.listOfDisplayedData=data
            console.log("exemple de club",data[0]);
            this.msg.info(data.length+' club chargés');
          },
          err => {
            this.msg.error('Erreur survenue lors du chargement des  club: '+err.error);
          })
  }


  //-----------fonctions
  edit(id:number){
    this.router.navigate(['edit/'+id],{relativeTo:this.route});
  }
  delete(id:number){
    this.clubService.deleteClub(id).subscribe(
      data => {
        this.msg.success(' supression du club d\'id: '+id);
        this.listOfDisplayedData = this.listOfData.filter((item: any) => item.id !==id);
        this.listOfData = this.listOfData.filter((item: any) => item.id !==id);

      },
      err => {
        this.msg.error('Erreur survenue lors de la supression : '+err.error);
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
  this.listOfDisplayedData = this.listOfData.filter((item: any) => item.nom.indexOf(this.searchValue) !== -1);
}
onCurrentPageDataChange($event: any): void {
  this.listOfCurrentPageData = $event;
}

checked = false;
indeterminate = false;
listOfCurrentPageData: any;
setOfCheckedId = new Set<number>();


submitForm(){
  const club=new Club()
  club.club=this.clubForm.controls['club'].value
  club.responsable=this.clubForm.controls['responsable'].value
  club.telephone=this.clubForm.controls['telephone'].value
  club.mel=this.clubForm.controls['mel'].value
  club.site=this.clubForm.controls['site'].value
  club.pays=this.clubForm.controls['pays'].value
  club.departement=this.clubForm.controls['departement'].value
  console.log(this.clubForm.value)
  this.clubService.addClub(club).subscribe(
    data => {
      this.msg.success(' club ajoute');
    },
    err => {
      this.msg.error('Erreur survenue lors de l\'ajout du club: '+err.error);
    })
}
}
