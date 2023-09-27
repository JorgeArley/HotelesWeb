import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReserveComponent } from './new-reserve.component';

describe('NewReserveComponent', () => {
  let component: NewReserveComponent;
  let fixture: ComponentFixture<NewReserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewReserveComponent]
    });
    fixture = TestBed.createComponent(NewReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
