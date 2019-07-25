import { TestBed } from "@angular/core/testing";

import { Top10sService } from "./top10s.service";

describe("Top10sService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: Top10sService = TestBed.get(Top10sService);
    expect(service).toBeTruthy();
  });
});
