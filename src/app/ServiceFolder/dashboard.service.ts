import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private staffUrl='http://localhost:3001/Staffs';
  private studentUrl='http://localhost:3000/Students';
  private coursesUrl='http://localhost:3003/Courses';
  constructor(private http:HttpClient) { }
  getStaffList():Observable<any[]>{
 return this.http.get<any[]>(`${this.staffUrl}`);
  }
  getStudentList():Observable<any[]>{
 return this.http.get<any[]>(`${this.studentUrl}`);
  }
  getCoursesList():Observable<any[]>{
 return this.http.get<any[]>(`${this.coursesUrl}`);
  }
}
