import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import{SharedModule} from '../../../../../../sharedModule/shared/shared.module';
import { EcritureService } from './../../../../../services-backoffice/ecriture.service';
import { ProviderService } from './../../../../../services-backoffice/provider.service';
import { DisplayComponent } from './display.component';

describe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;
  class ecritureServiceStub  {
    getDta(){

    }
  }
  class providerServiceStub  {
    getDta(){

    }
  }
  class nzMessageServiceStub  {
    getDta(){

    }
  }
  class formBuilderStub  {
    getDta(){

    }
  }
  beforeEach(() => {
  
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayComponent ],imports: [SharedModule,FormsModule,ReactiveFormsModule],
      providers: [
       
        EcritureService,
        ProviderService,
        {
          provide: NzMessageService,
          useClass: nzMessageServiceStub,
        },FormBuilder
      ]
    })
    .compileComponents();
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
