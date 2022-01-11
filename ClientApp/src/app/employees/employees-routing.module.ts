import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';



const routes: Routes = [
  {
    path: "employees",
    redirectTo: "employees/list",
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "employees/list",
    component: ListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "employees/:employeeId/details",
    component: DetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "employees/create",
    component: CreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "employees/:employeeId/edit",
    component: EditComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
