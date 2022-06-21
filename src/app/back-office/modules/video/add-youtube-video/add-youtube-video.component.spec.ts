import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYoutubeVideoComponent } from './add-youtube-video.component';

describe('AddYoutubeVideoComponent', () => {
  let component: AddYoutubeVideoComponent;
  let fixture: ComponentFixture<AddYoutubeVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddYoutubeVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddYoutubeVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
