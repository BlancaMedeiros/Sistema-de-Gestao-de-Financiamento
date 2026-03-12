import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ParcelasService } from '../parcelas-service';
import { ParcelasModel } from '../models/parcelas.model';
import { CommonModule } from '@angular/common'; // Importe o CommonModule

@Component({
  selector: 'app-tabela-parcelas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-parcelas.html',
  styleUrl: './tabela-parcelas.css',
})
export class TabelaParcelas implements OnInit {
  parcelas: ParcelasModel[] = [];

  constructor(private service: ParcelasService) {}

  ngOnInit() {
    this.service.retornaParcelas().subscribe(parcelas=>{
      this.parcelas = parcelas
      console.log(this.parcelas)
    })
  }
}

