import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { staffDetails } from '../InterfaceFolder/studentDetails';
import { StaffService } from '../ServiceFolder/staff.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stafflist',
  templateUrl: './stafflist.component.html',
  styleUrls: ['./stafflist.component.css'],
})
export class StafflistComponent implements OnInit {
  // @Input('staffList') staffs:staffDetails[]=[];
  // @Output() delete=new EventEmitter<string>();
  // @Output() edit=new EventEmitter<staffDetails>();

  // onDelete(staffId:string){
  //   this.delete.emit(staffId);
  // }
  // onEdit(staff:staffDetails){
  //   this.edit.emit(staff);
  // }

  staffs: staffDetails[] = [];
  constructor(
    private http: StaffService,
    private router: Router,
    private toast: ToastrService
  ) {}

  page:number=1;
  ngOnInit() {
    this.loadStaffs();
  }
  loadStaffs() {
    this.http.getAllStaffs().subscribe((staffs) => {
      this.staffs = staffs;
    });
  }
  onEdit(staffId: string) {
    this.router.navigate(['/staff', staffId]);
  }
  onDelete(staffId: string) {
    if (confirm('Are you sure do you want to delete the staff')) {
      this.http.deleteStaff(staffId).subscribe(() => {
        this.staffs = this.staffs.filter((s) => s.id !== staffId);
        this.toast.error("Staff record deleted successfully");
      });
    }
  }
}
