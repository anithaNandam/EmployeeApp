import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Employee } from '../employee';
import { EmployeesService } from '../employees.service';

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent implements OnInit {
  id: number;
  employee: Employee;
  editForm;

  constructor(
    public employeeService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      id: [""],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobileNo: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params["employeeId"];

    this.employeeService.getEmployee(this.id).subscribe((data: Employee) => {
      this.employee = data;
      this.editForm.patchValue(data);
    });
  }

  onSubmit(formData) {
    this.employeeService
      .updateEmployee(this.id, formData.value)
      .subscribe((res) => {
        Swal.fire({
          title: "Employee updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl("employees/list");
          }
        });
      });
  }
}
