import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvanceComponent } from '../advance/advance.component';
import { SalaryService } from '../salary.service';
import { SalarycalculateComponent } from '../salarycalculate/salarycalculate.component';
import { Employee } from './Employee'
@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css'],

})
export class SalaryComponent implements OnInit {
  @ViewChild(SalarycalculateComponent) child1!: SalarycalculateComponent;
  @ViewChild(AdvanceComponent) child12!: AdvanceComponent;
  isSalaryRadio: boolean = true;

  sal: number = 0;
  name: string = "";
  advance: number = 0
  constructor(private salaryService: SalaryService) { }
  employee:Employee[] =[]
  isLoadingSpinner = false
  getAllEmployee(){
  this.salaryService.getEmployeeList().subscribe(emp =>{
    this.employee = emp
    this.isLoadingSpinner = true
  })
  
  }
  fetchSalary(salIndex: number) {
    
    this.sal = this.employee[salIndex].salary
    this.name = this.employee[salIndex].name
    this.advance = this.employee[salIndex].advance
    this.salaryService.setSalary(this.sal)
    this.salaryService.setName(this.name)
    this.salaryService.setAdvance(this.advance)
    if (this.isSalaryRadio) {

      this.child1.childSalary();
    }
    else {
      
      this.child12.childAdvance(this.name);
    }




  }
  isSalary(val: any) {
    console.log(val)
    if (val == 2) {
      this.isSalaryRadio = false
    }
    else {
      this.isSalaryRadio = true
    }

  }

  ngOnInit(): void {
    this.getAllEmployee()

  }

}
