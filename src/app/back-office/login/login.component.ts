import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthentificationJWTService } from '../services-backoffice/authentification-jwt.service';
import {StockageJwtService} from '../services-backoffice/stockage-jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  src = `../../assets/images/logoSite.PNG`;
  constructor(private fb: FormBuilder,private router: Router,private msg: NzMessageService,private authService: AuthentificationJWTService,private stockage:StockageJwtService) { }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  isSuccessful = false;
  isloggedIn = false;
  errorMessage = '';
  validateForm!: FormGroup;
  passwordVisible = false;

  submitForm(): void {
    if (this.validateForm.valid) {
     console.log("Username: "+this.validateForm.controls['userName'].value)
     console.log("Password: "+this.validateForm.controls['password'].value)
    this.authService.login(this.validateForm.controls['userName'].value,this.validateForm.controls['password'].value ).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isloggedIn = true;
        //localStorage.setItem("utilisateur",JSON.stringify(this.validateForm.value))
        this.stockage.saveAccessToken(data.jwtAccessToken)
        this.stockage.saveRefreshToken(data.jwtRefreshToken)
        this.stockage.saveUser(JSON.stringify(this.validateForm.value))
        this.msg.success('Vous etes connecté');
        this.router.navigate(['/admin/home',]);
      },
      err => {
        console.log("erreur survenue");
        this.msg.error('utilisateur inexistant ou erreur survenue. Verrifiez vos informations...');
        this.isloggedIn = false;
      }
    );
      
    } 
    else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      }
      );
    }
  }
  

}
