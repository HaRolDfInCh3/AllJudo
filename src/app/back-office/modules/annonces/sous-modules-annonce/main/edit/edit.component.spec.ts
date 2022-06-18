import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { TestModule } from 'src/app/sharedModule/shared/testsModule';
import { Annonce } from 'src/app/back-office/models/classes/Annonce';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let router: Router;

  let activatedRoute: ActivatedRoute;
  class nzMessageServiceStub  {
    getDta(){

    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestModule]
      ,providers: [
             
              EcritureService,
              ProviderService,
              {
                provide: NzMessageService,
                useClass: nzMessageServiceStub,
              },FormBuilder
            ],
    })
    .compileComponents();
  });
  beforeEach(() => {
    router = TestBed.inject(Router);
 activatedRoute = TestBed.inject(ActivatedRoute);
 });
  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
