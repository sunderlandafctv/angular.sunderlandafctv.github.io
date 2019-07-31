import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home1950sComponent } from './home1950s.component';

describe('Home1950sComponent', () => {
  let component: Home1950sComponent;
  let fixture: ComponentFixture<Home1950sComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home1950sComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home1950sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
