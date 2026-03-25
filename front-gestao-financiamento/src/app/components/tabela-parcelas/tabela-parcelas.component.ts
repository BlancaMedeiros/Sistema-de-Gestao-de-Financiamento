import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ParcelasService } from '../../parcelas-service';
import { ParcelasModel } from '../../models/parcelas.model';
import { CommonModule } from '@angular/common'; 
import { ParcelaComponent } from '../parcela/parcela.component';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-tabela-parcelas',
  standalone: true,
  imports: [CommonModule, ParcelaComponent, FormsModule], 
  templateUrl: './tabela-parcelas.component.html',
  styleUrl: './tabela-parcelas.component.css',
})
export class TabelaParcelasComponent implements OnInit {
  parcelas: ParcelasModel[] = [];
  parcelasFiltradas: ParcelasModel[] = [];
  datasDisponiveis: string[] = [];
  
  filtroStatus: string = '';
  filtroNumero: string = '';
  filtroData: string = '';

  parcelaSelecionada: ParcelasModel | null = null;
  dadosUpdate = { 
    dataPagamento: '', 
    valorPago: 0, 
    situacao: '' 
  };

  constructor(
    private service: ParcelasService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.service.retornaParcelas().subscribe(parcelas => {
      this.parcelas = parcelas;
      this.parcelasFiltradas = parcelas;
      this.gerarOpcoesDeData();
      this.cdr.detectChanges();
    });
  }


  private gerarOpcoesDeData() {
    const meses = this.parcelas.map(p => p.MesVencimento);
    this.datasDisponiveis = [...new Set(meses)];
  }

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

    this.cdr.detectChanges();
  }

  abrirModal(parcela: ParcelasModel) {
    this.parcelaSelecionada = parcela;
    
    this.dadosUpdate = {
      dataPagamento: new Date().toISOString().split('T')[0], 
      valorPago: parcela.ProjecaoValor,
      situacao: parcela.Situacao
    };
    
    this.cdr.detectChanges();
  }

  fecharModal() {
    this.parcelaSelecionada = null;
    this.cdr.detectChanges();
  }

  confirmarUpdate() {
  
    console.log('Enviando para o banco:', {
      id: this.parcelaSelecionada?.ID,
      ...this.dadosUpdate
    });
    
    this.fecharModal();
  }
}