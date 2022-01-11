import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Employee } from './employee';
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class EmployeesService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.httpClient
      .get<Employee[]>(environment.apiUrl + "/employee")
      .pipe(catchError(this.errorHandler));
  }

  getEmployee(id): Observable<Employee> {
    return this.httpClient
      .get<Employee>(environment.apiUrl + "/employee/" + id)
      .pipe(catchError(this.errorHandler));
  }

  createEmployee(employee): Observable<Employee> {
    return this.httpClient
      .post<Employee>(
        environment.apiUrl + "/employee/",
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  updateEmployee(id, employee): Observable<Employee> {
    return this.httpClient
      .put<Employee>(
        environment.apiUrl + "/employee/" + id,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteEmployee(id) {
    return this.httpClient
      .delete<Employee>(
        environment.apiUrl + "/employee/" + id,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
