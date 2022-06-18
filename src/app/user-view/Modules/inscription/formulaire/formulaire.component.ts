import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { StockageJwtService } from 'src/app/back-office/services-backoffice/stockage-jwt.service';
import { User } from 'src/app/user-view/Models/classes/User';
import { AuthentificationService } from 'src/app/user-view/services/authentification.service';
import { PublicitesService } from 'src/app/user-view/services/publicites.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
  url?:string
  clubs:any
  passwordVisible = false;
  size: NzSelectSizeType = 'large';
  listePays:any
  listeGrades:any
  pub300x250:any
  inscriptionForm!: FormGroup;
constructor(
private pubService:PublicitesService,private fb: FormBuilder,private router: Router,private msg: NzMessageService,private authService: AuthentificationService,private dataProvider:ProviderService) { }

  ngOnInit(): void {
    this.pubService.getRandomBanniere_par_taille("300x250").subscribe(
      data => {
        console.log(data)
        if(data.image){
          this.url="https://www.alljudo.net/images/pubs/"+data.image
        }
      },
      err => {
        console.log("erreur survenue lors de la recuperation de la banniere");
      }
    );

    this.inscriptionForm = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
      nom: [null,],
      prenom: [null,],
      email: [null,[Validators.required]],
      date_naissance: [null,[Validators.required]],
      code_postale: [null,],
      ville: [null,],
      pays: [null,[Validators.required]],
      grade: [null,[Validators.required]],
      club: [null,[Validators.required]],
      newsletter: [null,],
      offres: [null,],
    });

    this.dataProvider.getAllpays().subscribe(
      data => {
        
        this.listePays=data
        console.log("exemple de pays",data[0]);
        this.msg.info(data.length+' pays chargés');
      },
      err => {
        this.msg.error('Erreur survenue lors du chargement des pays: '+err.error);
      })
      this.dataProvider.getAllClubs().subscribe(
        data => {
          
          this.clubs=data
          console.log("exemple de clubs",data[0]);
          this.msg.info(data.length+' clubs chargés');
        },
        err => {
          this.msg.error('Erreur survenue lors du chargement des  clubs: '+err.error);
        })
        this.dataProvider.getAllGrades().subscribe(
          data => {
            this.listeGrades=data
            console.log("exemple de grades",data[0]);
            this.msg.info(data.length+' grades chargés');
          },
          err => {
            this.msg.error('Erreur survenue lors du chargement des  grades: '+err.error);
          })
    
  }
  submitForm(): void {
    if (this.inscriptionForm.valid) {
     
     const user=new User()
     user.club=this.inscriptionForm.controls["club"].value
     user.code_postale=this.inscriptionForm.controls["code_postale"].value
     user.date_naissance2=this.inscriptionForm.controls["date_naissance"].value
     user.newsletter=this.inscriptionForm.controls["newsletter"].value
     user.nom=this.inscriptionForm.controls["nom"].value
     user.prenom=this.inscriptionForm.controls["prenom"].value
     user.email=this.inscriptionForm.controls["email"].value
     user.ville=this.inscriptionForm.controls["ville"].value
     user.pays=this.inscriptionForm.controls["pays"].value
     user.grade=this.inscriptionForm.controls["grade"].value
     user.username=this.inscriptionForm.controls["login"].value
     user.password=this.inscriptionForm.controls["password"].value
     user.offres=this.inscriptionForm.controls["offres"].value
     console.log("donnees: ",user)
    this.authService.register(user).subscribe(
      data => {
        console.log(data);
        //localStorage.setItem("utilisateur",JSON.stringify(this.inscriptionForm.value))
        
        this.msg.success('Vous etes membre de AllJudo');
        this.router.navigate(['/',]);
      },
      err => {
        console.log("erreur survenue");
        this.msg.error('Serveur indisponible...');
       
      }
    );
      
    } 
    else {
      Object.values(this.inscriptionForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      }
      );
    }
  }
  








}
