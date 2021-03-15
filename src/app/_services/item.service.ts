import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../model/item';



const ITEM_API = 'http://localhost:8080/api/item/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ItemService {
 
  private ITEM_API = 'http://localhost:8080/api/v1/item';
  constructor(private http: HttpClient) { }

  getItemList(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.ITEM_API}`).pipe(
     
    );
  }



createItem(item: object): Observable<object> {  
  return this.http.post(`${this.ITEM_API}`, item);  
}  

deleteItem(id: number): Observable<object> {  
  return this.http.delete(`${this.ITEM_API}/${id}`);  
}  

getItem(id: number): Observable<Object> {  
  return this.http.get(`${this.ITEM_API}/${id}`);  
}  

updateItem(id: number, value: any): Observable<Object> {  
  return this.http.put(`${this.ITEM_API}/${id}`, value);  
}  

}
