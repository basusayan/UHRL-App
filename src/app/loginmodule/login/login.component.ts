import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from './Login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide:boolean = true
  formData:any =[]
  model = new Login()
  showError:boolean = false;
  constructor(private router: Router) { }

  checkValidation(formData:any){
    if(formData.username =='admin' && formData.password=='admin'){
      console.log('Logged in')
      }
      else{
        this.showError = true
      }
  }
  ngOnInit(): void {
  }

  login(formData:NgForm){
    this.formData = formData.value
    console.log(this.formData)

    this.checkValidation(this.formData);
    this.router.navigate(['home'])
  }

}
