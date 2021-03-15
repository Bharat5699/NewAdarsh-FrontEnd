import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


import { Observable } from 'rxjs';
import { Subitem } from '../model/subitem';
@Injectable({
  providedIn: 'root'
})



export class SubItemService {

  private SUBITEM_API = 'http://localhost:8080/api/v1/subitem';
  constructor(private http: HttpClient) { }

  getSubItemList(): Observable<Subitem[]> {
    return this.http.get<Subitem[]>(`${this.SUBITEM_API}`).pipe(
     
      );
  }



createSubItem(subitem: object): Observable<object> {  
  return this.http.post(`${this.SUBITEM_API}`, subitem);  
}  

deleteSubItem(id: number): Observable<object> {  
  return this.http.delete(`${this.SUBITEM_API}/${id}`);  
}  

getSubItem(id: number): Observable<Object> {  
  return this.http.get(`${this.SUBITEM_API}/${id}`);  
}  

updateSubItem(id: number, value: any): Observable<Object> {  
  return this.http.put(`${this.SUBITEM_API}/${id}`, value);  
}  
}



