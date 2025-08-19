import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private rootUrl=environment.apiUrl;
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
