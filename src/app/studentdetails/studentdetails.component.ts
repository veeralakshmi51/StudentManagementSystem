import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../ServiceFolder/httpservice.service';
import { studentDetails } from '../InterfaceFolder/studentDetails';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Courses } from '../EnumFolder/role';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.css']
})
export class StudentdetailsComponent implements OnInit{
  constructor(private http:HttpserviceService,private toast:ToastrService){}
  students:any[]=[];
  openModal:boolean=false;
  page:number=1;
  

  courses=Object.values(Courses);

  selectedStudent:any=null;
  courseForm=new FormGroup({
    courseName:new FormControl('',[Validators.required])
  })
  ngOnInit() {
      this.http.getUsers().subscribe((data)=>{
        this.students=data;
      })
  }
  addCourse(student:any){
    const modal=document.getElementById('myModal')
    if(modal!=null){
      modal.style.display='block';
    }
    this.selectedStudent=student;
  }
  closeModal(){
     const modal=document.getElementById('myModal')
    if(modal!=null){
      modal.style.display='none';
    }
  }
  submitForm(){
    if(this.courseForm.invalid||!this.selectedStudent ){
      return;
    }
    const selectcourse:string=this.courseForm.value.courseName ?? '';
    this.http.updateUser(this.selectedStudent.id,{course:selectcourse}).subscribe(()=>{
      const index=this.students.findIndex((s)=>s.id===this.selectedStudent.id);
      if(index>-1){
        this.students[index].course=selectcourse;
      }
      this.toast.success('Course Added Succuessfully');
      this.courseForm.reset();
      this.selectedStudent=null;
    })
  
  }
  markstudentAttendance(student:any,status:string){
    this.http.updateAttendance(student.id,status).subscribe(()=>{
      const index = this.students.findIndex(s => s.id === student.id);
    if (index > -1) {
      this.students[index].attendance = status;
    }
    this.toast.success('Attendance marked');
  });
  
  }
  
}
