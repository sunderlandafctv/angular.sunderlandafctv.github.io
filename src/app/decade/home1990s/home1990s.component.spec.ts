import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home1990sComponent } from './home1990s.component';

describe('Home1990sComponent', () => {
  let component: Home1990sComponent;
  let fixture: ComponentFixture<Home1990sComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home1990sComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home1990sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
