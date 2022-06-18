import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd/ng-zorro-antd.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptorProviders } from '../../back-office/services-backoffice/intercepteur.interceptor';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    DemoNgZorroAntdModule, BrowserAnimationsModule,RouterTestingModule,
    EditorModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  exports: [
    FormsModule,ReactiveFormsModule,
    DemoNgZorroAntdModule,BrowserAnimationsModule,RouterTestingModule,
    EditorModule,
    EditorModule,
    HttpClientModule],
})
export class TestModule { }
