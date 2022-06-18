import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { NzMessageService } from 'ng-zorro-antd/message';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { TestModule } from 'src/app/sharedModule/shared/testsModule';
import { DisplayComponent } from './display.component';

describe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;
  let router: Router;

  let activatedRoute: ActivatedRoute;
  class nzMessageServiceStub  {
    getDta(){

    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayComponent ],
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
    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
