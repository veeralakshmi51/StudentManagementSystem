import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { studentDetails } from '../InterfaceFolder/studentDetails';
import { HttpserviceService } from '../ServiceFolder/httpservice.service';
import { Courses, Departments, Gender, Role } from '../EnumFolder/role';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  students: studentDetails[] = [];

  // courses = Object.values(Courses);
  gender = Object.values(Gender);
  departments = Object.values(Departments);
  roles = Object.values(Role);

  isEditMode = false;
  currentStudentID = '';

  studentForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      // Validators.maxLength(10),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      // Validators.minLength(5),
    ]),
    studentId: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    department: new FormControl('', [Validators.required]),
    rollNumber: new FormControl('', [Validators.required]),
    admissionDate: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
    ]),
    address: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    role: new FormControl(Role.student, [Validators.required]),
    password: new FormControl('', [Validators.required]),
    profileImg: new FormControl('', [Validators.required]),
  });


  constructor(
    private httpService: HttpserviceService,
    private router: Router,
    private route: ActivatedRoute,
    private toast:ToastrService
  ) {
    this.studentForm.get('dob')?.valueChanges.subscribe((dobvalue) => {
      if (dobvalue) {
        const age = this.calculateAge(dobvalue);
        this.studentForm
          .get('age')
          ?.setValue(age.toString(), { emitEvent: false });
      }
    });
  }

  ngOnInit() {
    this.currentStudentID = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.currentStudentID) {
      this.isEditMode = true;
      this.httpService
        .getStudentById(this.currentStudentID)
        .subscribe((student) => {
          this.studentForm.patchValue(student);
        });
    }
  }
  submitForm() {
    if (this.studentForm.valid) {
     if (!this.profileImageBase64 && this.isEditMode) {
      const oldImg = this.students.find(s => s.id === this.currentStudentID)?.profileImg;
      this.studentForm.patchValue({ profileImg: oldImg || '' });
    }

      const studentData: studentDetails = this.studentForm
        .value as studentDetails;
      if (this.isEditMode) {
        this.httpService
          .updateStudent(this.currentStudentID, studentData)
          .subscribe(() => {
            this.toast.success("Student details updated successfully");
            this.router.navigate(['/student-list']);
            this.studentForm.reset({ role: Role.student });
          });
      } else {
        this.httpService.addNewStudent(studentData).subscribe((student) => {
          this.students.push(student);
          this.toast.success("New Student created successfully");
          this.studentForm.reset({ role: Role.student });
          this.router.navigate(['/student-list']);
          console.log('success');
        });
      }
    } else {
      this.toast.warning('Please fill the form correctly!');
    }
  }

  onEdit(student: studentDetails) {
    this.isEditMode = true;
    this.currentStudentID = student.id ?? '';
    this.studentForm.patchValue({
      firstName: student.firstName,
      lastName: student.lastName,
      studentId: student.studentId,
      email: student.email,
      // course: student.course,
      department: student.department,
      rollNumber: student.rollNumber,
      admissionDate: student.admissionDate,
      phone: student.phone,
      address: student.address,
      age: student.age,
      dob: student.dob,
      gender: student.gender,
      role: student.role || Role.student,
      password: student.password,
      profileImg: student.profileImg,
    });
  }
  onDelete(studentId: string) {
    if (!studentId) {
      console.error('No student ID provided for deletion');
      return;
    }
    if (confirm('Are you sure do you want to delete this student record')) {
      this.httpService.deleteStudent(studentId).subscribe(() => {
        this.students = this.students.filter((s) => s.id !== studentId);
        this.toast.info("Student Record deleted successfully");
        this.httpService.getUsers();
      });
    }
  }

  calculateAge(dob: string) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  }
  profileImageBase64: string | null = null;
 onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input?.files?.length) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImageBase64 = reader.result as string;
      this.studentForm.patchValue({ profileImg: this.profileImageBase64 });
    };
    reader.readAsDataURL(file);
  }
}

}
