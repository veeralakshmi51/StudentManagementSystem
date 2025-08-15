import { Component, OnInit } from '@angular/core';
import { studentDetails } from '../InterfaceFolder/studentDetails';
import { Router } from '@angular/router';
import { HttpserviceService } from '../ServiceFolder/httpservice.service';
import { Designations } from '../EnumFolder/role';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css'],
})
export class StudentlistComponent implements OnInit {
  students: studentDetails[] = [];
  constructor(private router: Router, private http: HttpserviceService,private toast:ToastrService) {}

  page:number=1;
  ngOnInit() {
    this.loadStudents();
  }
  loadStudents() {
    this.http.getUsers().subscribe((students) => {
      this.students = students;
    });
  }
  onEdit(studentId: string) {
    this.router.navigate(['/student', studentId]);
  }
  onDelete(studentId: string) {
    if (confirm('Are you sure do you want to delete the student')) {
      this.http.deleteStudent(studentId).subscribe(() => {
        this.students = this.students.filter((s) => s.id !== studentId);
        this.toast.error('deleted success');
      });
    }
  }
}
