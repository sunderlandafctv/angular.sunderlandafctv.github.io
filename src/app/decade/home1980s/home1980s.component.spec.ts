import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home1980sComponent } from './home1980s.component';

describe('Home1980sComponent', () => {
  let component: Home1980sComponent;
  let fixture: ComponentFixture<Home1980sComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home1980sComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home1980sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
