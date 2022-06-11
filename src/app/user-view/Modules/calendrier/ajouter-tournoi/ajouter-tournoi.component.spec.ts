import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTournoiComponent } from './ajouter-tournoi.component';

describe('AjouterTournoiComponent', () => {
  let component: AjouterTournoiComponent;
  let fixture: ComponentFixture<AjouterTournoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterTournoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterTournoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
