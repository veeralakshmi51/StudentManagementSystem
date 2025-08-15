import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { staffDetails } from '../InterfaceFolder/studentDetails';
@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http:HttpClient) { }
    private apiUrl='http://localhost:3000/Staffs';
  
    addNewStaff(staff:staffDetails){
    console.log('New student details:',staff);
  
      return this.http.post<staffDetails>(this.apiUrl,staff);
    }
    getAllStaffs(){
      
      return this.http.get<staffDetails[]>(this.apiUrl);
    }
    updateStaff(id:string,staff:staffDetails){
      return this.http.put<staffDetails>(`${this.apiUrl}/${id}`,staff);
    }
    deleteStaff(id:string){
      return this.http.delete<staffDetails>(`${this.apiUrl}/${id}`);
    }
    getById(id:string){
      return this.http.get<staffDetails>(`${this.apiUrl}/${id}`);
    }
}
