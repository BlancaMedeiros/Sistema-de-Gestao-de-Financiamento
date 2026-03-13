import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabelaParcelasComponent } from './tabela-parcelas.component';


describe('TabelaParcelas', () => {
  let component: TabelaParcelasComponent;
  let fixture: ComponentFixture<TabelaParcelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaParcelasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaParcelasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
