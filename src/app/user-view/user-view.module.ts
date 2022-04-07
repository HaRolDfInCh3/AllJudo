import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{SharedModule} from '../sharedModule/shared/shared.module';
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
    SharedModule,
    UserViewRoutingModule
  ]
})
export class UserViewModule { }
