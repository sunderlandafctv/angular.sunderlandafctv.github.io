import { TestBed } from '@angular/core/testing';

import { VideosOTMService } from './videos-otm.service';

describe('VideosOTMService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideosOTMService = TestBed.get(VideosOTMService);
    expect(service).toBeTruthy();
  });
});
