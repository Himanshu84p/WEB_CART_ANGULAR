import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/v1/products';

  constructor(private http: HttpClient) {}

  // Get all products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getHttpOptions());
  }

  // Get one product by ID
  getOneProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}`, this.getHttpOptions());
  }

  // HTTP Options with authorization header
  private getHttpOptions() {
    const token = localStorage.getItem('accessToken');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return { headers: headers };
  }
}
