import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ViewTaskDetailsComponent } from './component/view-task-details/view-task-details.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'view-details/:id', component: ViewTaskDetailsComponent },];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
