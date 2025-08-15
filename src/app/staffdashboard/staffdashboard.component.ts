import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../ServiceFolder/dashboard.service';

@Component({
  selector: 'app-staffdashboard',
  templateUrl: './staffdashboard.component.html',
  styleUrls: ['./staffdashboard.component.css']
})
export class StaffdashboardComponent implements OnInit {
  constructor(private http:DashboardService){}
  coursesCount=0;
  studentCount=0;
  ngOnInit() {
      this.http.getCoursesList().subscribe((data)=>{
        this.coursesCount=data.length;
      })
      this.http.getStudentList().subscribe((data)=>{
        this.studentCount=data.length;
      })
  }
}
