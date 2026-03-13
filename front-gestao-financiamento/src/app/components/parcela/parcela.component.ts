import { Component, Input } from '@angular/core';
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
  

}
