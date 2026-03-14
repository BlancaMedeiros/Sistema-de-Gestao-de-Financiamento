import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabelaParcelasComponent } from '../tabela-parcelas/tabela-parcelas.component';


@Component({
  selector: 'app-container-parcelas',
  standalone: true,
  imports: [CommonModule, TabelaParcelasComponent],
  templateUrl: './container-parcelas.component.html',
  styleUrl: './container-parcelas.component.css',
})
export class ContainerParcelasComponent {}
