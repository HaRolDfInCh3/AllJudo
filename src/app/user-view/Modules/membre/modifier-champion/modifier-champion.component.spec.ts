import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierChampionComponent } from './modifier-champion.component';

describe('ModifierChampionComponent', () => {
  let component: ModifierChampionComponent;
  let fixture: ComponentFixture<ModifierChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierChampionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
