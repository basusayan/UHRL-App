import { Component, Input, OnInit } from '@angular/core';
import { SalaryService } from '../salary.service';
import { Observable } from 'rxjs';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomValidator } from './custom.validator';
import { EmployeeAdvance } from '../advance/EmployeeAdvance';



@Component({
  selector: 'app-salarycalculate',
  templateUrl: './salarycalculate.component.html',
  styleUrls: ['./salarycalculate.component.css'],
  
})
export class SalarycalculateComponent implements OnInit {
 
  salary:number = 0;
  name:string ="";
  advance=0;
  firstInit:boolean = false;
  attendenceForm!: FormGroup;
  
  currentDateCompleteString:any;
  
  previousCompleteString:any;
  isAdvanceLoaded:boolean = false;
  isSalaryRadio:boolean = true
  employeeWiseAdvance: EmployeeAdvance[] = []
  employeeWiseAdvanceAPI!:Observable<EmployeeAdvance[]>
  salarySubmitted:boolean = false
  lastId:number = 0;
  lastIdAPI:any;
  advances!:EmployeeAdvance;
  constructor(private salaryService:SalaryService) { 
  
    
  }
  //Getting called at salary.component
  childSalary(){
    this.firstInit =true
    this.salarySubmitted = false;
    this.isAdvanceLoaded = false;
    this.salary = this.salaryService.getSalary()
    this.name = this.salaryService.getName()
    //Local lists starts
    /*
    if(this.employeeWiseAdvance.length!=0){
      let checkVal =this.employeeWiseAdvance.filter(val => val.name ===this.name);
      console.log(checkVal.length)
      if(checkVal.length >0){
        this.attendenceForm.patchValue({
          advance: checkVal[0].advance
        });
       }
       else{
        this.advance =this.salaryService.getAdvance()
        this.attendenceForm.patchValue({
          advance: this.advance
        });
      }
    }
    else{
      this.advance =this.salaryService.getAdvance()
      this.attendenceForm.patchValue({
        advance: this.advance
      });
    }
    //Local List ends
    */
   this.employeeWiseAdvanceAPI.subscribe(
     value=>{
      if(value.length!=0){
        let checkVal =value.filter(val => val.name ===this.name);
        console.log(checkVal.length)
        if(checkVal.length >0){
          this.attendenceForm.patchValue({
            advance: checkVal[0].advance
          });
          this.isAdvanceLoaded = true
         }
         else{
          this.advance =this.salaryService.getAdvance()
          this.attendenceForm.patchValue({
            advance: this.advance
          });
          this.isAdvanceLoaded = true
        }
      }
      else{
        this.advance =this.salaryService.getAdvance()
        this.attendenceForm.patchValue({
          advance: this.advance
        });
        this.isAdvanceLoaded = true
      }
     }
   )

  }
  
  ngOnInit(): void {
    
    this.attendenceForm = new FormGroup({
      
      month: new FormControl('',Validators.required),
      workingDay: new FormControl('',[Validators.required,Validators.pattern("^[0-9.]*$"),CustomValidator.rangeValidator]),
      attendence:new FormControl('',[Validators.required,Validators.pattern("^[0-9.]*$"),CustomValidator.rangeValidator]),
      advance: new FormControl('',[Validators.required,Validators.pattern("^[0-9.]*$")])
    });
    
    
    //this.employeeWiseAdvance = this.salaryService.getEmployeeWiseAdvance()
    this.currentDateCompleteString = this.salaryService.getAllYearDropdown()[0]
    this.previousCompleteString = this.salaryService.getAllYearDropdown()[1]
    this.employeeWiseAdvanceAPI = this.salaryService.getAdvanceRecord()
    
  }
  
  

    onSubmit(form: FormGroup) {
      console.log('Valid?', form.valid); // true or false
      console.log('Name', this.name);
      console.log('Email', this.salary);
      console.log('Month', form.value.month);
      console.log('Working Day', form.value.workingDay);
      console.log('Attendence', form.value.attendence);
      //this.salaryService.updateAdvance(this.name,form.value.advance)
      //this.lastId= +this.name.split(' ')[1]
      /*this.salaryService.getId(this.name).subscribe(val=>{
        console.log(val)
        this.lastId =val
      })*/
      this.salaryService.getId(this.name).subscribe((val:any)=>{
        this.lastIdAPI=val
        console.log(this.lastIdAPI)
        this.advances ={
          id: this.lastIdAPI,
          name: this.name,
          month:form.value.month,
          advance: form.value.advance
  
        }
        
      this.salaryService.updateAdvanceAPI(this.advances).subscribe(advances => this.salaryService.getAdvanceRecord())
      this.salarySubmitted = true
      })
      
      
      
    }
}
