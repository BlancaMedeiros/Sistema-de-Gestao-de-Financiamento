import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ParcelasModel } from '../../models/parcelas.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[app-parcela]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parcela.component.html',
  styleUrl: './parcela.component.css',
})
export class ParcelaComponent {
  @Input() parcela: ParcelasModel | undefined;
  
  @Output() registrarPagamento = new EventEmitter<ParcelasModel>();

  aoRegistrarPagamento() {
    console.log('Registrando pagamento para a parcela ID:', this.parcela);
    
    // Emite o evento para o componente pai (tabela), passando os dados da parcela
    this.registrarPagamento.emit(this.parcela);

    // Aqui você pode adicionar lógica para abrir um modal de confirmação, por exemplo.
  }
}

