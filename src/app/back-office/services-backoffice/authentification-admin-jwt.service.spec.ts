import { TestBed } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { AuthentificationAdminJWTService } from './authentification-admin-jwt.service';

describe('AuthentificationJWTService', () => {
  let service: AuthentificationAdminJWTService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule]
      },);
    service = TestBed.inject(AuthentificationAdminJWTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
