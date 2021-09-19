import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './loginmodule/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular.material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './homepage/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalaryComponent } from './salary/salary.component';
import { UpdatedashboardComponent } from './updatedashboard/updatedashboard.component';
import { SalarycalculateComponent } from './salarycalculate/salarycalculate.component';
import { SalaryService } from './salary.service';
import { AdvanceComponent } from './advance/advance.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { WebApiData } from 'src/WebApi';
import { AdvanceWebApiData } from 'src/AdvanceWebAPI';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    DashboardComponent,
    SalaryComponent,
    UpdatedashboardComponent,
    SalarycalculateComponent,
    AdvanceComponent,
    
  ],
  imports: [
    BrowserModule,
    
    
    BrowserAnimationsModule,
    //HomepageModule,
    
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(WebApiData)
    
    
    

  ],
  providers: [SalaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
