class Employee{
    constructor(object){
        this.id = object.id;
        this.name = object.name != null ? object.name : "";
        this.email = object.email != null ? object.email : "";
        this.contactInformation = object.contactInformation != null ? object.contactInformation : [];
        this.website = object.website != null ? object.website : "";
        this.address = object.address != null ? object.address : "";
    }

    editInformation(object){
        this.name = object.name != null ? object.name : this.name;
        this.email = object.email;
        this.contactInformation = [object.contactInformation[0],object.contactInformation[1]];
        this.website = object.webiste;
        this.address = object.address;
    }
}

class EmployeeList{
    constructor(employeeDetailsList){
        this.employeeList = []
        // if employee list is not null append details
        if(employeeDetailsList){
            for(const emp of employeeDetailsList){
                if(!emp.id){
                    emp.id = 'emp';
                    emp.id += this.getListLength() != 0 ? this.employeeList.length+1 : 1;  
                } 
                let empObj = new Employee(emp);
                this.employeeList.push(empObj);
            }
        }
    }

    
    addEmployee(employeeDetails){
        employeeDetails.id = 'emp';
        employeeDetails.id += this.getListLength() != 0 ? this.employeeList.length+1 : 1;
        let emp = new Employee(employeeDetails);
        this.employeeList.push(emp)
    }

    editEmployee(id,employeeDetails){
        for(const emp of this.employeeList){
            if(emp.id == id){
                emp.editInformation(employeeDetails);
                break; }
            }     
    }
    
    deleteEmployee(empId){
        this.employeeList = this.employeeList.filter(employee => employee.id != empId);
    }

    getListLength(){
        return this.employeeList.length;
    }
    
    getEmployee(empId){
        return this.employeeList.filter(employee => employee.id == empId)[0]
    }

    toJSON(){
        return this.employeeList;
    }
    
    static fromJSON(json){
        let obj = new EmployeeList(json);
        return obj;
    }
}


export {Employee,EmployeeList};