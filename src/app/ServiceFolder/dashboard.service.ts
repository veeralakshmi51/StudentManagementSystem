import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private rootUrl='http://localhost:3000';
  private staffUrl=`${this.rootUrl}/Staffs`;
  private studentUrl=`${this.rootUrl}/Students`;;
  private coursesUrl=`${this.rootUrl}/Courses`;
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
