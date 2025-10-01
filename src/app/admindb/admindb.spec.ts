import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admindb } from './admindb';

describe('Admindb', () => {
  let component: Admindb;
  let fixture: ComponentFixture<Admindb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admindb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Admindb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
