import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ParcelasModel } from '../../models/parcelas.model';
import { CommonModule } from '@angular/common';
import { ParcelasService } from '../../services/parcelas-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '[app-parcela]',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parcela.component.html',
  styleUrl: './parcela.component.css',
})
export class ParcelaComponent {
  @Input() parcela!: ParcelasModel;
  dadosUpdate = { 
    dataPagamento: new Date(), 
    valorPago: 0, 
    situacao: 'paga' 
  };
  modalEstaAberta = false;
  
  constructor(private parcelasService: ParcelasService, private cdr: ChangeDetectorRef){}
  abrirModal() {
    this.modalEstaAberta = true;
    this.dadosUpdate = {
      dataPagamento: new Date(), 
      valorPago: this.parcela.ProjecaoValor,
      situacao: 'paga'
    };
    this.cdr.detectChanges();
  }

  fecharModal() {
    this.modalEstaAberta = false;
    this.cdr.detectChanges();
  }

  confirmarUpdate() {
    console.log('Enviando para o banco:', {
      id: this.parcela?.ID,
      ...this.dadosUpdate
    });
    this.parcela.ValorPago = this.dadosUpdate.valorPago;
    this.parcela.DataPagamento = this.dadosUpdate.dataPagamento;
    this.parcela.Situacao = this.dadosUpdate.situacao;
    this.parcelasService.atualizarParcela(this.parcela.ID, this.dadosUpdate).subscribe(resultado=>{
      this.fecharModal();
    });
  }


  isAtrasado(vencimento: string): boolean {
    // 1. Mapeia os meses abreviados para números (0-11)
    const meses: { [key: string]: number } = {
      jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
      jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11
    };

    // 2. Divide a string "jul/23" em ["jul", "23"]
    const [mesStr, anoStr] = vencimento.toLowerCase().split('/');
    
    // 3. Converte o ano para formato completo (ex: 23 -> 2023)
    const anoVencimento = 2000 + parseInt(anoStr);
    const mesVencimento = meses[mesStr];

    // 4. Cria objetos de data para comparação (usando o dia 1 do mês)
    const dataVencimento = new Date(anoVencimento, mesVencimento, 1);
    const dataAtual = new Date();
    
    // Zeramos o dia da data atual para comparar apenas Mês e Ano
    const primeiroDiaMesAtual = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);

    // 5. Retorna true se o mês atual for maior que o vencimento
    return primeiroDiaMesAtual > dataVencimento;
  }
  getSituacao(){
    if(this.parcela.Situacao!="pendente")
      return this.parcela.Situacao;
    return this.isAtrasado(this.parcela.MesVencimento)? "atrasada" : "pendente"

  }
}


