import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userquery } from './userquery';

describe('Userquery', () => {
  let component: Userquery;
  let fixture: ComponentFixture<Userquery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userquery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userquery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
