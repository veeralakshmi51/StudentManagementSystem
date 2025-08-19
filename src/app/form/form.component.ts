import { Component, OnInit } from '@angular/core';
import { staffDetails } from '../InterfaceFolder/studentDetails';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Departments, Designations, Role } from '../EnumFolder/role';
import { StaffService } from '../ServiceFolder/staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit{
  staffs: staffDetails[] = [];

  isEdit = false;
  currentStaffID = '';

  staffLoginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    joinDate: new FormControl('', [Validators.required]),
    staffId: new FormControl('', [Validators.required]),
    role: new FormControl(Role.staff, [Validators.required]),
  });

  constructor(private http: StaffService,private router:Router,private route:ActivatedRoute,private toast:ToastrService) {}

    designations=Object.values(Designations);
    departments=Object.values(Departments);

 ngOnInit() {
    this.currentStaffID = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.currentStaffID) {
      this.isEdit = true;
      this.http.getById(this.currentStaffID).subscribe((staff) => {
        this.staffLoginForm.patchValue(staff);
      });
    }
  }
  loginStaff() {
    if (this.staffLoginForm.valid) {
      const staffData = this.staffLoginForm.value as staffDetails;
      if (this.isEdit) {
        this.http.updateStaff(this.currentStaffID, staffData).subscribe(() => {
         
        this.toast.success('staff details updated successfully');
         this.router.navigate(['/staff-list']);
          this.staffLoginForm.reset({ role: Role.staff });
        });
      } else {
        this.http.addNewStaff(staffData).subscribe((staff) => {
          this.staffs.push(staff);
          this.toast.success('student details added successfully');
          this.staffLoginForm.reset({ role: Role.staff });
          this.router.navigate(['/staff-list']);
        });
      }
    } else {
      this.toast.show('fill correctly');
    }
  }
  onEdit(staff: staffDetails) {
    this.isEdit = true;
    this.currentStaffID = staff.id ?? '';
    this.staffLoginForm.patchValue({
      name: staff.name,
      password: staff.password,
      staffId: staff.staffId,
      email: staff.email,
      designation: staff.designation,
      department: staff.department,
      joinDate: staff.joinDate,
      role: staff.role,
      phone: staff.phone,
    });
  }
  onDelete(staffId: string) {
    if (confirm('Are you sure do you want to delete the staff')) {
      this.http.deleteStaff(staffId).subscribe((staffs) => {
        this.staffs = this.staffs.filter((s) => s.id !== staffId);
        this.toast.error('Staff record deleted successfully');
        this.http.getAllStaffs().subscribe((staffs)=>{
          this.staffs=staffs;
        })
      });
    }
  }
}
