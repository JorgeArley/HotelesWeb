import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHotelPageComponent } from './new-hotel-page.component';

describe('NewHotelPageComponent', () => {
  let component: NewHotelPageComponent;
  let fixture: ComponentFixture<NewHotelPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewHotelPageComponent]
    });
    fixture = TestBed.createComponent(NewHotelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
