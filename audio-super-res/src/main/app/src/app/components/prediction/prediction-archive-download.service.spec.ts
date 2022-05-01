import { TestBed } from '@angular/core/testing';

import { PredictionArchiveDownloadService } from './prediction-archive-download.service';

describe('PredictionArchiveDownloadService', () => {
  let service: PredictionArchiveDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredictionArchiveDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
