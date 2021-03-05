import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../Models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  baseUrl = `${environment.UrlPrincipal}/api/account`;
  
  constructor(private  http: HttpClient) { }
  
  
  
  getAll():Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}`);
  }
  
  getById(id: number) :Observable<Account>{
    return this.http.get<Account>(`${this.baseUrl}/${id}`);
  }

  post(account: Account){
    return this.http.post(`${this.baseUrl}`,account);
  }

  put(account: Account){
    // console.log(account); 
    return this.http.put(`${this.baseUrl}?id=${account.id}`,account);
  }

  delete(id: number){
    return this.http.delete(`${this.baseUrl}?id=${id}`);
  }
  
}