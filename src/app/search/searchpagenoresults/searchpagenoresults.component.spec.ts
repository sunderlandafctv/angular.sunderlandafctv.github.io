import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchpagenoresultsComponent } from './searchpagenoresults.component';

describe('SearchpagenoresultsComponent', () => {
  let component: SearchpagenoresultsComponent;
  let fixture: ComponentFixture<SearchpagenoresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchpagenoresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchpagenoresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
