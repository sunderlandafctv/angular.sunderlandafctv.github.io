import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home1970sComponent } from './home1970s.component';

describe('Home1970sComponent', () => {
  let component: Home1970sComponent;
  let fixture: ComponentFixture<Home1970sComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home1970sComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home1970sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
