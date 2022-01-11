import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeesService } from '../employees.service';

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
})
export class CreateComponent implements OnInit {
  createForm;
  constructor(
    public employeeService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm = this.formBuilder.group({
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
    return this.createForm.controls;
  }
  ngOnInit(): void {

  }

  onSubmit(formData) {
    this.employeeService.createEmployee(formData.value).subscribe((res) => {
      Swal.fire({
        title: "Employee created successfully",
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
