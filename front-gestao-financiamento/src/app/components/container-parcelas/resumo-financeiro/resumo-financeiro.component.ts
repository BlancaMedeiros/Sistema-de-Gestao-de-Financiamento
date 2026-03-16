import { CommonModule, registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);
Chart.register(...registerables);

@Component({
  selector: 'app-resumo-financeiro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumo-financeiro.component.html',
  styleUrl: './resumo-financeiro.component.css',
})
export class ResumoFinanceiroComponent implements OnInit, AfterViewInit {
  @ViewChild('meuCanvas') elementoCanvas!: ElementRef;
  chart: any;

  dadosResumo: any = {
    total: 0,
    pago: 0,
    saldo: 0,
    proximo_vencimento: 'Carregando...',
    porcentagem_paga: 0
  };

  constructor(private http: HttpClient, private cdr:ChangeDetectorRef){}

  ngOnInit() {
    this.buscarDadosApi();
  }

  ngAfterViewInit() {
   
    this.renderizarGrafico();
  }

buscarDadosApi() {
  this.http.get<any>('http://localhost:5000/resumo').subscribe({
    next: (res) => {
      console.log('DADOS CHEGARAM:', res); 
      this.dadosResumo = res;
      this.atualizarGrafico(res.porcentagem_paga);
      this.cdr.detectChanges(); 
    },
    error: (err) => {
      console.error('ERRO NA API:', err);
    }
  });
}

  renderizarGrafico() {
    this.chart = new Chart(this.elementoCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Pago', 'Restante'],
        datasets: [{
          data: [0, 100], 
          backgroundColor: ['#089181', '#E2E8F0'], 
          borderWidth: 0,
        }]
      },
      options: {
        cutout: '80%',
        plugins: { legend: { display: false } }
      }
    });
  }

  atualizarGrafico(porcentagem: number) {
    if (this.chart) {
      this.chart.data.datasets[0].data = [porcentagem, 100 - porcentagem];
      this.chart.update();
    }
  }
}

