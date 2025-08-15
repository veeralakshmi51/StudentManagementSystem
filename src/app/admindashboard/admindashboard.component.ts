import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../ServiceFolder/dashboard.service';
import { Courses, Role } from '../EnumFolder/role';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
})
export class AdmindashboardComponent implements OnInit {
  staffCount = 0;
  maxStaffLimit = 50;
  studentCount=0;
  maxStudentCount=100;
  coursesCount=0;
  maxCoursesCount=50;
  totalCount=0;
  maxCount=this.maxStaffLimit+this.maxStudentCount;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getStaffList().subscribe((data) => {
      this.staffCount = data.length;
    });
    this.dashboardService.getStudentList().subscribe((data)=>{
      this.studentCount=data.length;
    })
    this.dashboardService.getCoursesList().subscribe((data)=>{
      this.coursesCount=data.length;
    })
  }
  calculateStaffProgress(count: number) {
    return Math.min((count / this.maxStaffLimit) * 100, 100);
  }
  getProgress(count: number) {
    if (count < 50) {
      return 'bg-success';
    } else if (count >= 50 && count < 100) {
      return 'bg-warning';
    } else {
      return 'bg-danger';
    }
  }
   calculateStudentProgress(count: number) {
    return Math.min((count / this.maxStudentCount) * 100, 100);
  }
  getProgressStudent(count: number) {
    if (count < 50) {
      return 'bg-success';
    } else if (count >= 50 && count < 100) {
      return 'bg-warning';
    } else {
      return 'bg-danger';
    }

  }

 calculateCourseProgress(count: number) {
    return Math.min((count / this.maxCoursesCount) * 100, 100);
  }
  getProgressCourses(count: number) {
    if (count < 50) {
      return 'bg-success';
    } else if (count >= 50 && count < 100) {
      return 'bg-warning';
    } else {
      return 'bg-danger';
    }
    
  }
  calculateTotal(count:number){
   return Math.min((count/this.maxCount*100),100);
  }
 getTotal(count: number) {
    if (count < 50) {
      return 'bg-success';
    } else if (count >= 50 && count < 100) {
      return 'bg-warning';
    } else {
      return 'bg-danger';
    }
    
  }
}
