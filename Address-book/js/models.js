class Employee{
    constructor(object){
        this.id = object.id;
        this.name = object.name != null ? object.name : "";
        this.email = object.email != null ? object.email : "";
        this.contactInformation = object.contactInformation.length > 0 ? object.contactInformation : [];
        this.website = object.website != null ? object.website : "";
        this.address = object.address != null ? object.address : "";
        this.employeeStatus = true; // exits or show in page
    }

    editInformation(object){
        this.name = object.name != null ? object.name : this.name;
        this.email = object.email;
        this.object.contactInformation = [object.contactInformation[0],object.contactInformation[1]];
        this.website = object.webiste;
        this.address = object.address;
        this.employeeStatus = object.status ; // exits or show in page
    }

    changeEmployeeStatus(status){
        this.employeeStatus = status;
    }
}

class EmployeeList{
    constructor(employeeDetailsList){
        this.employeeList = []
        // if employee list is not null append details 
        if(employeeDetailsList){
            for(const emp of employeeDetailsList){
                emp.id = this.employeeList.length == 0 ? this.employeeList.length+1 : 1;
                let empObj = new Employee(emp);
                this.employeeList.push(empObj);
            }
        }

        console.log(this.employeeList);
    }

    addEmployee(employeeDetails){
        employeeDetails.id = this.employeeList.length == 0 ? this.employeeList.length+1 : 1;
        emp = new Employee(employeeDetails);
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
        for(const emp of this.employeeList){
            if(emp.id == empId){
                emp.changeEmployeeStatus(false);
                break;
            }
        }
    }

    getEmployee(empId){
        for(const emp of this.employeeList){
            if(emp.id == empId && emp.employeeStatus == true){
                return emp;
            }
        }
    }
}

// views
class formView{
    constructor(){
        this.contactsList = document.querySelector(".contacts-list");
    }

    createContact(object){
        // creating list for empoloyee details
        let listElement = document.createElement("li");
        listElement.classList.add('candit-details');

        // creating p tags for employee information
        let nameElement = document.createElement("p");
        nameElement.classList.add("candit-name");
        nameElement.innerText = object['name'];

        let emailElement = document.createElement("p");
        emailElement.classList.add("candit-email");
        emailElement.innerText = object['email'];

        let contactElement = document.createElement("p");
        contactElement.classList.add("candit-contact");
        contactElement.innerText = object['contactInformation'][0];

        listElement.append(nameElement,emailElement,contactElement);

        return listElement;
    }

    displayContacts(employees){
        while(this.contactsList.firstChild){
            this.contactsList.removeChild(this.contactsList.firstChild);
        }
        if(employees.length ==  0){
            let element = document.createElement("p");
            element.textContent = "No contacts Available";
            this.contactsList.append(element);
        }else{
            employees.forEach(employee => {
                let empInfo = this.createContact(employee);
                this.contactsList.append(empInfo);
            });
        }
    }

    
}


// defining data
initialContacts = [{name:'Praveen Battula', email: 'praveen@technovert.com', contactInformation: ['+91 923 345 2342','040 30 1231211'], website: 'htttp://www.technovert.com', address: '123 now here some street, madhapur Hyderabad 500033'},
        {name:'Chandermani Arora', email: 'chandermani@technovert.com', contactInformation: ['+91 9292929292','040 30 1231211'], website: 'htttp://www.technovert.com', address: '123 now here some street, madhapur Hyderabad 500033'},
        {name:'Shashi Pagadala', email: 'vijay@technovert.com', contactInformation: ['+91 9292929292','040 30 1231211'], website: 'htttp://www.technovert.com', address: '123 now here some street, madhapur Hyderabad 500033'},
        {name:'Vijay Yalamanchili', email: 'vijay@technovert.com', contactInformation: ['+91 9292929292','040 30 1231211'], website: 'htttp://www.technovert.com', address: '123 now here some street, madhapur Hyderabad 500033'}
    ]

// controllers
class Controller{
    constructor(){
        // initiating models and views
        this.model = new EmployeeList(initialContacts);
        this.view = new formView();

        // displaying info in the view
        this.view.displayContacts(this.model.employeeList);
    }
}

document.addEventListener('load',init());

function init(){
    let obj = new Controller();
}