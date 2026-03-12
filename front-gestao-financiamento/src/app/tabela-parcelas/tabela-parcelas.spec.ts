import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaParcelas } from './tabela-parcelas';

describe('TabelaParcelas', () => {
  let component: TabelaParcelas;
  let fixture: ComponentFixture<TabelaParcelas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaParcelas],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaParcelas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
