import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ParcelasService } from '../../parcelas-service';
import { ParcelasModel } from '../../models/parcelas.model';
import { CommonModule } from '@angular/common'; 
import { ParcelaComponent } from '../parcela/parcela.component';

@Component({
  selector: 'app-tabela-parcelas',
  standalone: true,
  imports: [CommonModule, ParcelaComponent],
  templateUrl: './tabela-parcelas.component.html',
  styleUrl: './tabela-parcelas.component.css',
})
export class TabelaParcelasComponent implements OnInit {
  parcelas: ParcelasModel[] = [];
  
  // Novas variáveis para os filtros
  parcelasFiltradas: ParcelasModel[] = [];
  datasDisponiveis: string[] = [];
  
  // Estado dos filtros
  filtroStatus: string = '';
  filtroNumero: string = '';
  filtroData: string = '';

  // Usando o construtor conforme solicitado
  constructor(
    private service: ParcelasService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.service.retornaParcelas().subscribe(parcelas => {
      this.parcelas = parcelas;
      this.parcelasFiltradas = parcelas; // Inicialmente mostra tudo
      
      this.gerarOpcoesDeData();
      
      console.log(this.parcelas);
      this.cdr.detectChanges();
    });
  }

  // Extrai os meses únicos para o select
  private gerarOpcoesDeData() {
    const meses = this.parcelas.map(p => p.MesVencimento);
    this.datasDisponiveis = [...new Set(meses)];
  }

  // Função que aplica todos os filtros juntos
  aplicarFiltros(event: any, tipo: string) {
    const valor = event.target.value;

    if (tipo === 'status') this.filtroStatus = valor;
    if (tipo === 'numero') this.filtroNumero = valor;
    if (tipo === 'data') this.filtroData = valor;

    this.parcelasFiltradas = this.parcelas.filter(p => {
      const matchStatus = !this.filtroStatus || p.Situacao.toLowerCase() === this.filtroStatus.toLowerCase();
      const matchNumero = !this.filtroNumero || p.NumeroParcela.toString().includes(this.filtroNumero);
      const matchData = !this.filtroData || p.MesVencimento === this.filtroData;

      return matchStatus && matchNumero && matchData;
    });

    this.cdr.detectChanges(); // Garante que a tela atualize após filtrar
  }
}