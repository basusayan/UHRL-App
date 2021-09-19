import {InMemoryDbService} from 'angular-in-memory-web-api';
import { EmployeeAdvance } from './app/advance/EmployeeAdvance';
import { Employee } from './app/salary/Employee';
//import { EmployeeAdvance } from './app/advance/EmployeeAdvance'
export class WebApiData implements InMemoryDbService{
    createDb(){
        let employee: Employee[] = [
            { name: 'Employee 1', id: 1, salary: 10000, advance: 500 },
            { name: 'Employee 2', id: 2, salary: 20000, advance: 600 },
            { name: 'Employee 3', id: 3, salary: 30000, advance: 700 },
            { name: 'Employee 4', id: 4, salary: 40000, advance: 800 },
            { name: 'Employee 5', id: 5, salary: 50000, advance: 900 },
            { name: 'Employee 6', id: 6, salary: 60000, advance: 850 },
            { name: 'Employee 7', id: 7, salary: 70000, advance: 950 },
            { name: 'Employee 8', id: 8, salary: 80000, advance: 650 },
            { name: 'Employee 9', id: 9, salary: 90000, advance: 250 },
            { name: 'Employee 10', id: 10, salary: 100000, advance: 470 },
        
          ];

          let employeeAdvance:EmployeeAdvance[] = [
            
           
          ];

          
    return {employeeList:employee,advances:employeeAdvance }
}
}
