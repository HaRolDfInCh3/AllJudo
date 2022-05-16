import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Club } from 'src/app/back-office/models/classes/Club';
import { ClubsService } from 'src/app/back-office/services-backoffice/clubs.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id?:number;
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private router: Router,private dataProvider:ProviderService,private clubService:ClubsService,private msg: NzMessageService) { }
  clubForm!: FormGroup;
  size: NzSelectSizeType = 'large';
  listeDepartement:any
  listePays:any
  currentClub:any

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params["id"]);
  });
    this.clubForm = this.fb.group({
      pays: [null, [Validators.required]],
      departement: [null,],
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
        this.clubService.getClub(this.id||0).subscribe(
          data => {
            this.currentClub=data
            this.clubForm.controls['club'].patchValue( this.currentClub.club);
            this.clubForm.controls['responsable'].patchValue( this.currentClub.responsable);
            this.clubForm.controls['telephone'].patchValue( this.currentClub.telephone);
            this.clubForm.controls['mel'].patchValue( this.currentClub.mel);
            this.clubForm.controls['site'].patchValue( this.currentClub.site);
            this.clubForm.controls['pays'].patchValue( this.currentClub.pays);
            this.clubForm.controls['departement'].patchValue( this.currentClub.departement);
            console.log("club recuperé",data);
            this.msg.info(' club chargé');
          },
          err => {
            this.msg.error('Erreur survenue lors du chargement du club: '+err.error);
          })
  }
  updateForm(){
    const club=new Club()
  club.club=this.clubForm.controls['club'].value
  club.id=this.currentClub.id
  club.responsable=this.clubForm.controls['responsable'].value
  club.telephone=this.clubForm.controls['telephone'].value
  club.mel=this.clubForm.controls['mel'].value
  club.site=this.clubForm.controls['site'].value
  club.pays=this.clubForm.controls['pays'].value
  club.departement=this.clubForm.controls['departement'].value
  console.log(this.clubForm.value)

  this.clubService.updateClub(this.id||0,club).subscribe(
    data => {
      this.msg.success(' club mis a jour ');
    },
    err => {
      this.msg.error('Erreur survenue lors de la mise a jour du club: '+err.error);
    })

  }

}
