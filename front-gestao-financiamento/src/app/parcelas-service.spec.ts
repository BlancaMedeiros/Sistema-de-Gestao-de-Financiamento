import { TestBed } from '@angular/core/testing';

import { ParcelasService } from './parcelas-service';

describe('ParcelasService', () => {
  let service: ParcelasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParcelasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
