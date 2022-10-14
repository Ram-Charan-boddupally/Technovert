class Employee{
    constructor(object){

        this.id = object.id;
        this.name = object.name != null ? object.name : "";
        this.email = object.email != null ? object.email : "";
        this.contactInformation = object.contactInformation != null ? object.contactInformation : [];
        this.website = object.website != null ? object.website : "";
        this.address = object.address != "" ? object.address : "NA";
        this.contactInformation[1] = object.contactInformation[1] == null ? 'NA' : object.contactInformation[1];
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
                if(!emp.id) emp.id = this.getEmpId(emp.id);
                let empObj = new Employee(emp);
                this.employeeList.push(empObj);
            }
        }
    }

    getEmpId(empId){
        empId = 'emp';
        if(this.getListLength() > 0) empId += parseInt(this.employeeList[this.getListLength()-1].id.split("emp")[1])+1;
        else empId += 0;

        return empId;
    }

    addEmployee(employeeDetails){
        employeeDetails.id = this.getEmpId(employeeDetails.id);

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