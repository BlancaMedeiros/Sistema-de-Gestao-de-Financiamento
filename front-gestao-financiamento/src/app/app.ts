import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabelaParcelas } from './tabela-parcelas/tabela-parcelas';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabelaParcelas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-gestao-financiamento');
}
