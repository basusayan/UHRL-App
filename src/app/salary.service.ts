import { Injectable } from '@angular/core';
import { EmployeeAdvance } from './advance/EmployeeAdvance';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import { Employee } from './salary/Employee';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})

export class SalaryService {
  employeeSalary: number = 0
  employeeName: string = ""
  employeeAdvance = 0
  employeeWiseAdvance: EmployeeAdvance[] = []
  previousMonth: string = "";
  currentDate: any;
  currentMonth: any = ""
  currentYear: any = ""
  currentDateCompleteString: any;
  previousYear: any;
  previousCompleteString: any;
  previousMonthIndex: any;
  allEmployees!:Observable<Employee[]>;
  empTest!:Employee[];
  monthArray = ["January", "February", "March", "April", "May", "June","July", 
  "August", "September", "October", "November", "December"
]
  lastId:any;
  employeeUrl = "/api/employeeList"
  advanceUrl = "/api/advances"

  setSalary(salary: number) {
    this.employeeSalary = salary;
  }
  setName(name: string) {
    this.employeeName = name
  }
  setAdvance(adv: number) {
    this.employeeAdvance = adv
  }
  getSalary(): number {

    return this.employeeSalary
  }

  getName(): string {
    return this.employeeName
  }
  getAdvance() {
    return this.employeeAdvance

  }

  getEmployeeWiseAdvance() {
    return this.employeeWiseAdvance
  }

  advanceCalculate(advanceData: EmployeeAdvance) {
    this.employeeWiseAdvance.push(advanceData)

    
    //this.getEmployeeWiseAdvance()

  }

  createAdvanceRecord(advance:EmployeeAdvance):Observable<EmployeeAdvance>{
    //let httpheaders = new HttpHeaders().set('Content-type','application/Json')
    //let options = {headers: httpheaders}
    
    return this.http.post<EmployeeAdvance>(this.advanceUrl,advance,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateAdvanceAPI(advances:EmployeeAdvance):Observable<EmployeeAdvance>{
    return this.http.put<EmployeeAdvance>(this.advanceUrl+'/'+advances.id,advances)
    
  }

  getAdvanceRecord():Observable<EmployeeAdvance[]>{
    return this.http.get<EmployeeAdvance[]>(this.advanceUrl)
  }

  updateAdvance(name: string, advance: number) {

    //this.employeeWiseAdvance[0].advance = advance
    this.employeeWiseAdvance.forEach(val => {
      if (val.name === name) {
        val.advance = advance
      }
    })


  }
  getEmployeeList():Observable<Employee[]>{
    
    return this.http.get<Employee[]>(this.employeeUrl);
  }
    
    

  getAllYearDropdown():string[] {
    
    this.currentDate = new Date()
    this.currentMonth = this.currentDate.toLocaleString('en-EN', { month: 'long' })
    this.currentYear = this.currentDate.getFullYear()

    this.currentDateCompleteString = this.currentMonth + '-' + this.currentYear
    this.previousMonthIndex = this.currentDate.getMonth()
    //console.log(this.previousMonthIndex)
    this.previousMonth = this.monthArray[this.previousMonthIndex - 1];



    if (this.currentMonth == "January") {
      
      this.previousYear = (this.currentDate.getFullYear()) - 1
      this.previousCompleteString = "December" + '-' + this.previousYear
      return [this.currentDateCompleteString,this.previousCompleteString]

    }
    else {
      
      this.previousCompleteString = this.previousMonth + '-' + this.currentYear
      return [this.currentDateCompleteString,this.previousCompleteString]
    }

  }

  getId(name:string):any{
    
    this.allEmployees = this.getEmployeeList()
    return this.allEmployees.pipe(map((value=>{
      this.lastId = value.filter(val => val.name ===name)[0].id
      //console.log(this.lastId , 'Hee')
      return this.lastId
    })
    ))
    
   
   
  }

  getEmpAPI():Employee[]{
    this.allEmployees.subscribe((emp:Employee[])=>{
      this.empTest = emp
    })
    return this.empTest
  }
  ngOnInit(){
    this.allEmployees = this.getEmployeeList()
  }

  constructor(private http:HttpClient) {
    console.log('Service constructor') 
    
  }
}
