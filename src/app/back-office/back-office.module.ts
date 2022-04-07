import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{SharedModule} from '../sharedModule/shared/shared.module';
import { BackOfficeRoutingModule } from './back-office-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    MainPageComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    SharedModule
  ]
})
export class BackOfficeModule { }
