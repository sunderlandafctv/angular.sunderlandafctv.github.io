import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundNavComponent } from './page-not-found-nav.component';

describe('PageNotFoundNavComponent', () => {
  let component: PageNotFoundNavComponent;
  let fixture: ComponentFixture<PageNotFoundNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
