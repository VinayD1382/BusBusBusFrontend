import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAdmin } from './booking-admin';

describe('BookingAdmin', () => {
  let component: BookingAdmin;
  let fixture: ComponentFixture<BookingAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
