import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userdb } from './userdb';

describe('Userdb', () => {
  let component: Userdb;
  let fixture: ComponentFixture<Userdb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userdb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userdb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
