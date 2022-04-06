import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd.module';
import { BackOfficeRoutingModule } from './back-office-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    MainPageComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    DemoNgZorroAntdModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class BackOfficeModule { }
