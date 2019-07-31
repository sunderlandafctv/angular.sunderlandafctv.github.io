import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePre1950sComponent } from './home-pre1950s.component';

describe('HomePre1950sComponent', () => {
  let component: HomePre1950sComponent;
  let fixture: ComponentFixture<HomePre1950sComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePre1950sComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePre1950sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
