import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { EmployeesModule } from './employees/employees.module';
import { ListComponent } from './employees/list/list.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ErrorInterceptor } from './_helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavMenuComponent,
    CounterComponent,
    FetchDataComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    EmployeesModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: ListComponent,
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "counter",
        component: CounterComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "fetch-data",
        component: FetchDataComponent,
        canActivate: [AuthGuard],
      },
      { path: "employees", component: ListComponent, canActivate: [AuthGuard] },
      { path: "login", component: LoginComponent },
      // otherwise redirect to home
      { path: "**", redirectTo: "" },
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
