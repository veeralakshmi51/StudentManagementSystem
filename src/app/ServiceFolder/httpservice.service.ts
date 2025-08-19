import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { staffDetails, studentDetails } from '../InterfaceFolder/studentDetails';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http:HttpClient) { }
  private rootUrl=environment.apiUrl;
  private apiUrl=`${this.rootUrl}/Students`
  private courseUrl=`${this.rootUrl}/Courses`;
  addNewStudent(student:studentDetails){
  console.log('New student details:',student);

    return this.http.post<studentDetails>(this.apiUrl,student);
  }
  getUsers(){
    
    return this.http.get<studentDetails[]>(this.apiUrl);
  }
  updateStudent(id:string,student:studentDetails){
    return this.http.put<studentDetails>(`${this.apiUrl}/${id}`,student);
  }
  deleteStudent(id:string){
    return this.http.delete<studentDetails>(`${this.apiUrl}/${id}`);
  }
  getStudentById(id:string){
    return this.http.get<studentDetails>(`${this.apiUrl}/${id}`);
  }
  updateUser(id:string,updateData:Partial<studentDetails>){
    return this.http.patch<studentDetails>(`${this.apiUrl}/${id}`,updateData);
  }
  updateAttendance(id:string,attendance:string){
    return this.http.patch<studentDetails>(`${this.apiUrl}/${id}`,{attendance});
  }
}
