import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './loginmodule/login/login.component';
import { LoginmoduleModule } from './loginmodule/loginmodule.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular.material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginmoduleModule,
    BrowserAnimationsModule,
    
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class AppModule { }
