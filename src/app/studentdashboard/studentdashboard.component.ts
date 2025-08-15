import { Component } from '@angular/core';
import { studentDetails } from '../InterfaceFolder/studentDetails';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../ServiceFolder/httpservice.service';

@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent {
student!: studentDetails; 

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpserviceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 

    if (id) {
      this.httpService.getStudentById(id).subscribe({
        next: (data) => {
          this.student = data;
          console.log(this.student);
          
        },
        error: (err) => {
          console.error('Error fetching student:', err);
        }
      });
    }
  }
}
