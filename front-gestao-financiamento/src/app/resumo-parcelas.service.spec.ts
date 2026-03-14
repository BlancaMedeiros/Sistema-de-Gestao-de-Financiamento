import { TestBed } from '@angular/core/testing';

import { ResumoParcelasService } from './resumo-parcelas.service';

describe('ResumoParcelasService', () => {
  let service: ResumoParcelasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumoParcelasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
