import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerParcelasComponent } from './components/container-parcelas/container-parcelas.component';
import { ResumoFinanceiroComponent } from './components/container-parcelas/resumo-financeiro/resumo-financeiro.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContainerParcelasComponent, ResumoFinanceiroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-gestao-financiamento');
}
