import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SalaryService } from '../salary.service';
import { CustomValidator } from '../salarycalculate/custom.validator';
import { EmployeeAdvance } from './EmployeeAdvance';
import { last,map } from 'rxjs/operators'

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.css']
})
export class AdvanceComponent implements OnInit {
  
  salary: number = 0;
  name: string = "";
  advance: number = 0;
  firstInit: boolean = false;
  advanceForm!: FormGroup;
  lastID:number= 0;
  lastIDOb!:number;
  currentDateCompleteString: any;
  
  previousCompleteString: any;
  
  isSalaryRadio: boolean = true
  employeeWiseAdvance: EmployeeAdvance[] = []
  employeeAdvance1!: EmployeeAdvance;
  advanceSubmitted = false;
  isAdvanceLoaded:boolean = false;
  employeeWiseAdvanceAPI!:Observable<EmployeeAdvance[]>;
  constructor(private salaryService: SalaryService) {

  }
  childAdvance(nameAdvancee: string) {
    this.firstInit = true
    this.advanceSubmitted =false
    this.isAdvanceLoaded = false
    this.name = this.salaryService.getName()
    /*// Local List Starts
    if (this.employeeWiseAdvance.length != 0) {
      
        for(let value of this.employeeWiseAdvance){
        if (value.name == nameAdvancee) {
          
          this.advanceForm.patchValue({
            advance: value.advance
          });
          break;
        }
        else {
         
          this.advanceForm.patchValue({
            advance: this.salaryService.getAdvance()
          });
        }
      }
    }
    else {
      this.advanceForm.patchValue({
        advance: this.salaryService.getAdvance()
      });
    }
    //Local List ends*/
    this.employeeWiseAdvanceAPI.subscribe(
      value => {
        if(value.length!=0){
          for(let val of value){
            if (val.name == nameAdvancee) {
              
              this.advanceForm.patchValue({
                advance: val.advance
              });
              this.isAdvanceLoaded = true
              break;
            }
            else {
             
              this.advanceForm.patchValue({
                advance: this.salaryService.getAdvance()
              });
              this.isAdvanceLoaded = true
            }
          }
        }
        else {
          this.advanceForm.patchValue({
            advance: this.salaryService.getAdvance()
          });
          this.isAdvanceLoaded = true
        }
      }
    )



  }

  ngOnInit(): void {
    this.advanceForm = new FormGroup({
      advance: new FormControl('',[Validators.required,Validators.pattern("^[0-9.]*$")]),
      month: new FormControl('', Validators.required)

    });

    this.employeeWiseAdvanceAPI = this.getAdvanceRecordAPI()
    this.employeeWiseAdvance = this.salaryService.getEmployeeWiseAdvance()
    this.currentDateCompleteString = this.salaryService.getAllYearDropdown()[0]
    this.previousCompleteString = this.salaryService.getAllYearDropdown()[1]
    //this.lastID = this.getLastID()
    //console.log(this.lastID)
  }

  onSubmit(form: FormGroup) {
    this.lastID = +this.name.split(' ')[1]
    /*this.salaryService.getId(this.name).subscribe(val=>{
      console.log(val)
      this.lastID =val
    })*/
    this.employeeAdvance1 = {
      id: this.lastID,
      name: this.name,
      advance: form.value.advance,
      month: form.value.month
    }
    //this.employeeWiseAdvance = this.salaryService.getEmployeeWiseAdvance()
    //console.log(this.employeeAdvance1)+-+ 
    /*
  if(this.employeeWiseAdvance.length!=0){
   let checkVal =this.employeeWiseAdvance.filter(val => val.name ===this.employeeAdvance1.name);
   
   if(checkVal.length >0){
    this.salaryService.updateAdvance(checkVal[0].name,this.employeeAdvance1.advance)
   }
   else{
    this.salaryService.advanceCalculate(this.employeeAdvance1)
    this.createAdvanceRecordTS(this.employeeAdvance1)
   }
  }
  else{
    
    this.salaryService.advanceCalculate(this.employeeAdvance1)
    this.createAdvanceRecordTS(this.employeeAdvance1)
  }
  */
  this.employeeWiseAdvanceAPI.subscribe(value =>
    {
      if(value.length!=0){
        let checkVal =value.filter(val => val.name ===this.employeeAdvance1.name);
        
        if(checkVal.length >0){
         //this.salaryService.updateAdvance(checkVal[0].name,this.employeeAdvance1.advance)
         this.updateAdvanceAPI(this.employeeAdvance1)
        }
        else{
         //this.salaryService.advanceCalculate(this.employeeAdvance1)
         this.createAdvanceRecordTS(this.employeeAdvance1)
        }
       }
       else{
         
         //this.salaryService.advanceCalculate(this.employeeAdvance1)
         this.createAdvanceRecordTS(this.employeeAdvance1)
       }

    })
    this.employeeWiseAdvance = this.salaryService.getEmployeeWiseAdvance()
    //console.log(this.employeeWiseAdvance)
    this.advanceSubmitted =true;
    //this.employeeAdvanceTest = this.salaryService.getAdvanceRecord()
    
    //this.lastID = this.lastID + 1
  }

  getAdvanceRecordAPI():Observable<EmployeeAdvance[]>{
    return this.salaryService.getAdvanceRecord()
    //return this.employeeAdvanceTest
    

  }
  createAdvanceRecordTS(advances:EmployeeAdvance){
    
    this.salaryService.createAdvanceRecord(advances).subscribe(advance=> this.getAdvanceRecordAPI())
  }
  updateAdvanceAPI(advances:EmployeeAdvance){
    //let id = +this.name.split(' ')[1]
    this.salaryService.updateAdvanceAPI(advances).subscribe(advances => this.getAdvanceRecordAPI())
  }


}


