import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Employee } from '../employee';
import { EmployeesService } from '../employees.service';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(public employeeService: EmployeesService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }

  deleteEmployee(id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
         this.employeeService.deleteEmployee(id).subscribe((res) => {
           this.employees = this.employees.filter((item) => item.id !== id);
            Swal.fire("Deleted!", "Employee has been deleted.", "success");
         });

      }
    });

  }
}
