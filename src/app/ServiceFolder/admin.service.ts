import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { admin } from '../InterfaceFolder/studentDetails';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  private rooturl=environment.apiUrl
    private apiUrl=`${this.rooturl}/admin`;

  addNewAdmin(admin:admin){
    return this.http.post<admin>(`${this.apiUrl}`,admin);
  }
  
}
