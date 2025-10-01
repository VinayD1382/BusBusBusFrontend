import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminbus } from './adminbus';

describe('Adminbus', () => {
  let component: Adminbus;
  let fixture: ComponentFixture<Adminbus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminbus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminbus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
