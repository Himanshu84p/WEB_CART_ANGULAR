import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/v1/cart';

  constructor(private http: HttpClient) { }

  //add item to the cart
  addItemToCart(productId: string, quantity: number): Observable<any> {
    console.log('quantity', quantity, productId);
    return this.http
      .post(
        `${this.apiUrl}/add-item`,
        { productId, quantity },
        this.getHttpOptions()
      )
      .pipe(
        map((response: any) => {
          console.log('response', response);
          return response;
        })
      );
  }
  //decrease stock quantity on order success
  decreaseStockQuantity(cartId: string): Observable<any> {
    console.log('cart id', cartId);
    return this.http
      .post(
        `${this.apiUrl}/order`,
        { cartId },
        this.getHttpOptions()
      )
      .pipe(
        map((response: any) => {
          console.log('response in decrease quantity', response);
          return response;
        })
      );
  }

  //remove item from the cart
  removeItemFromCart(productId: string): Observable<any> {
    const token = this.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { productId },
    };

    if (token) {
      httpOptions.headers = httpOptions.headers.append(
        'Authorization',
        `Bearer ${token}`
      );
    }

    return this.http.delete<void>(`${this.apiUrl}/remove-item`, httpOptions);
  }

  //increment quantity
  //add item to the cart
  updateQuantity(productId: string, quantity: number): Observable<any> {
    console.log('productId for update quantity', productId)
    return this.http
      .put(
        `${this.apiUrl}/update-item`,
        { productId, quantity },
        this.getHttpOptions()
      )
      .pipe(
        map((response: any) => {
          console.log('response', response);
          return response;
        })
      );
  }
  //fetch the cart
  fetchCart(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}`, this.getHttpOptions())
      .pipe(map((response: any) => response.data.items));
  }

  //fetch the cart
  deleteCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-cart`, this.getHttpOptions()).pipe(
      map((response: any) => {
        console.log('response', response);
        return response;
      })
    );
  }
  // Get token from local storage
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  //HTTP Options with authorization header
  private getHttpOptions() {
    const token = this.getAccessToken();
    console.log('token', token);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return { headers: headers };
  }
}
