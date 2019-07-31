import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home1960sComponent } from './home1960s.component';

describe('Home1960sComponent', () => {
  let component: Home1960sComponent;
  let fixture: ComponentFixture<Home1960sComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home1960sComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home1960sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
