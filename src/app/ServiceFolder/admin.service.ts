import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { admin } from '../InterfaceFolder/studentDetails';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  private apiUrl='http://localhost:3002/admin';
  
  addNewAdmin(admin:admin){
    return this.http.post<admin>(`${this.apiUrl}`,admin);
  }
  
}
