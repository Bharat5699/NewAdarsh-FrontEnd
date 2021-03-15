import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ORDER_API = 'http://localhost:8080/api/v1/order';
  constructor(private http: HttpClient) { }

  getOrderList(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.ORDER_API}`).pipe(
     
    );
  }

  searchOrderList(order: object): Observable<Order[]> {
    return this.http.post<Order[]>(`http://localhost:8080/api/v1/Searchorder`, order).pipe(  );  
  }

createOrder(order: object): Observable<object> {  
  return this.http.post(`${this.ORDER_API}`, order);  
}  

deleteOrder(id: number): Observable<object> {  
  return this.http.delete(`${this.ORDER_API}/${id}`);  
}  

getOrder(id: number): Observable<Object> {  
  return this.http.get(`${this.ORDER_API}/${id}`);  
}  

updateOrder(id: number, value: any): Observable<Object> {  
  return this.http.put(`${this.ORDER_API}/${id}`, value);  
}  
}
