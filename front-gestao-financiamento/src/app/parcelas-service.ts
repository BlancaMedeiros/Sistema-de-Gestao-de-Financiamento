import { Injectable } from '@angular/core';
import { ParcelasModel } from './models/parcelas.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ParcelasService {
  constructor(private http: HttpClient) {}
  retornaParcelas() {
    return this.http.get<ParcelasModel[]>('http://127.0.0.1:5000/parcelas')
  }
}
