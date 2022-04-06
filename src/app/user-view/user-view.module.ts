import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd.module';
import { UserViewRoutingModule } from './user-view-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    
  ],
  imports: [
    CommonModule,
    DemoNgZorroAntdModule,
    UserViewRoutingModule
  ]
})
export class UserViewModule { }
