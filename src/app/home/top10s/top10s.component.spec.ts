import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Top10sComponent } from "./top10s.component";

describe("Top10sComponent", () => {
  let component: Top10sComponent;
  let fixture: ComponentFixture<Top10sComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top10sComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top10sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
