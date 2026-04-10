import { Injectable } from '@angular/core';
import { ParcelasModel } from '../models/parcelas.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParcelasService {
  constructor(private http: HttpClient) {}
  retornaParcelas() {
    return this.http.get<ParcelasModel[]>('http://127.0.0.1:5000/parcelas')
  }
  atualizarParcela(id: number, dados: any): Observable<any> {
    return this.http.put(`http://127.0.0.1:5000/atualizar-parcela/${id}`, dados);
  }
}
