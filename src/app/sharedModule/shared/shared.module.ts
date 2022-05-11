import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd/ng-zorro-antd.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';
import { authInterceptorProviders } from '../../back-office/services-backoffice/intercepteur.interceptor';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    DemoNgZorroAntdModule,
    EditorModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  exports: [
    FormsModule,ReactiveFormsModule,
    DemoNgZorroAntdModule,
    EditorModule,
    HttpClientModule],
})
export class SharedModule { }
