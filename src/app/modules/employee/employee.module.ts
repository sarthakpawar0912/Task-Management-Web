import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DemoAngularMaterialModule } from '../../DemoAngularmaterialModule';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewTaskDetailsComponent } from './component/view-task-details/view-task-details.component';
@NgModule({
  declarations: [
    DashboardComponent,
    ViewTaskDetailsComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule,
    DemoAngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class EmployeeModule { }
