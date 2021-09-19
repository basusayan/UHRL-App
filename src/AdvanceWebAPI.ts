import {InMemoryDbService} from 'angular-in-memory-web-api';
import { EmployeeAdvance } from './app/advance/EmployeeAdvance';
export class AdvanceWebApiData implements InMemoryDbService{
    createDb(){
        let employeeAdvance: EmployeeAdvance[] = [
            
          ];
    return {employeeAdvance:employeeAdvance}
}
}