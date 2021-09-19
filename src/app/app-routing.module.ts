import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './homepage/home/home.component';
import { LoginComponent } from './loginmodule/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SalaryComponent } from './salary/salary.component';
import { SalarycalculateComponent } from './salarycalculate/salarycalculate.component';
import { UpdatedashboardComponent } from './updatedashboard/updatedashboard.component';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  
  {path:'login', component: LoginComponent},
  {path:'home',component: HomeComponent,children :[
    {path:'', redirectTo: 'dashboard' , pathMatch:'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path:'salary', component: SalaryComponent,children:[
    {path:'salarycalculate', component: SalarycalculateComponent}
    ]},
    {path:'updatedashboard', component: UpdatedashboardComponent}
    
  ]},
  {path:'**', component: NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
