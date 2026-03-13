import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabelaParcelasComponent } from './components/tabela-parcelas/tabela-parcelas.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabelaParcelasComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-gestao-financiamento');
}
