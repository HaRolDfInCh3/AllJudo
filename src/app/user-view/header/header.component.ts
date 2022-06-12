import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StockageJwtService } from 'src/app/back-office/services-backoffice/stockage-jwt.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  src = `../../assets/images/logoSite.PNG`;
  isSuccessful = false;
  isloggedIn = false;
  errorMessage = '';
  userName?:string
  userForm!: FormGroup;
  passwordVisible = false;
  constructor(private fb: FormBuilder,private router: Router,private msg: NzMessageService,private authService: AuthentificationService,private stockage:StockageJwtService) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      login_front: [null, [Validators.required]],
      password_front: [null, [Validators.required]]
    });
    if(this.stockage.getUserNormal()){
      let user=JSON.parse(this.stockage.getUserNormal()||"{sociopathe:psychopathe}")
      this.isloggedIn=true
      this.userName=user.login_front
      console.log(user)
    }
  }



  submitForm(): void {
    if (this.userForm.valid) {
     console.log("Username: "+this.userForm.controls['login_front'].value)
     console.log("Password: "+this.userForm.controls['password_front'].value)
    this.authService.login(this.userForm.controls['login_front'].value,this.userForm.controls['password_front'].value ).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isloggedIn = true;
        //localStorage.setItem("utilisateur",JSON.stringify(this.userForm.value))
        this.stockage.saveAccessToken(data.jwtAccessToken)
        this.stockage.saveRefreshToken(data.jwtRefreshToken)
        this.stockage.saveUserNormal(JSON.stringify(this.userForm.value))
        this.msg.success('Vous etes connecté');
        this.userName=this.userForm.controls['login_front'].value
        //this.router.navigate(['/admin/home',]);
      },
      err => {
        console.log("erreur survenue");
        this.msg.error('utilisateur inexistant ou erreur survenue. Verrifiez vos informations...');
        this.isloggedIn = false;
      }
      
    );
    this.authService.getUserByUsername(this.userForm.controls['login_front'].value).subscribe(
      data => {
        console.log(data);
        this.stockage.saveUserNormalDetails(data)
      },
      err => {
        console.log("erreur survenue");
        this.msg.error('utilisateur inexistant ou erreur survenue. Verrifiez vos informations...');
        this.isloggedIn = false;
      })
      
    } 
    else {
      Object.values(this.userForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      }
      );
    }
  }
  loggout(){
    this.msg.info('revenez nous vite !');
    this.stockage.signOut();
    this.isloggedIn=false
  }

  inscription(){
    this.router.navigate(['/inscription',]);
  }
  espace_membre(){
    this.router.navigate(['/membre/details',]);
  }
  goto(page:string){
    if(page=="actus"){
      this.router.navigate(['/actualites-judo',]);
    }else if(page=="videos"){
      this.router.navigate(['/videos',]);
    }else if(page=="calendrier"){
      this.router.navigate(['/calendrier',]);
    }else if(page=="champions"){
      this.router.navigate(['/champions',]);
    }else if(page=="resultats"){
      this.router.navigate(['/resultats',]);
    }
    else if(page=="home"){
      this.router.navigate(['/',]);
    }
    
  }

}
