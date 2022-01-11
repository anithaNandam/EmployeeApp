import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeesService } from '../employees.service';

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent implements OnInit {
  id: number;
  employee: Employee;

  constructor(
    public employeeService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["employeeId"];
    this.employeeService.getEmployee(this.id).subscribe((data: Employee) => {
      this.employee = data;
    });
  }
}
