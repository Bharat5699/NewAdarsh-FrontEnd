import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../model/item';
import { Linkitem } from '../model/linkitem';
const ITEM_API = 'http://localhost:8080/api/item/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class LinkItemService {

  private ITEM_API = 'http://localhost:8080/api/v1/linkitem';
  constructor(private http: HttpClient) { }

  getItemList(id: number): Observable<Linkitem[]> {
    return this.http.get<Linkitem[]>(`${this.ITEM_API}/${id}`).pipe(
     
    );
  }



createItem(linkitem: Linkitem[]): Observable<object> {  
  return this.http.post(`${this.ITEM_API}`,{'linkitem':linkitem}, httpOptions );  
}  

  

}