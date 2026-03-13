import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ParcelasService } from '../../parcelas-service';
import { ParcelasModel } from '../../models/parcelas.model';
import { CommonModule } from '@angular/common'; // Importe o CommonModule
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

  constructor(private service: ParcelasService) {}

  ngOnInit() {
    this.service.retornaParcelas().subscribe(parcelas=>{
      this.parcelas = parcelas
      console.log(this.parcelas)
    })
  }
}

