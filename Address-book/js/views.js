// views
class FormView{
    constructor(){
        this.contactForm = document.querySelector("#contactForm");
        this.contactInformation = []

        this.name = this.contactForm.querySelector("#name");
        this.email = this.contactForm.querySelector("#email");
        this.contactInformation.push(this.contactForm.querySelector("#mobileNumber"));
        this.contactInformation.push(this.contactForm.querySelector("#contactInformation"));
        this.website = this.contactForm.querySelector("#website");
        this.address = this.contactForm.querySelector("#address");
        this.details = {}
    }

    bindSubmitForm(handler,handler1){
        this.contactForm.querySelector("button[type='submit']").addEventListener('click',()=>{
            this.details.contactInformation = [];
            this.details.name = this.name.value;
            this.details.email = this.email.value;
            this.details.contactInformation.push(this.contactInformation[0].value);
            this.details.contactInformation.push(this.contactInformation[1].value);
            this.details.website = this.website.value;
            this.details.address = this.address.value;

            handler.addEmployee(this.details);
            handler1.displayContacts(handler.employeeList);
        });
    }

    bindResetForm(){
        this.contactForm.querySelector("button[type='reset']").addEventListener('click',()=>{
                                   
            let inputTags = this.contactForm.querySelectorAll("input");
                for(const tag of inputTags){
                    tag.value = "";
                }
                this.contactForm.querySelector("textarea").value = "";
            });
    }

}

class InfoView{
    constructor(){
        this.contactsList = document.querySelector(".contacts-list");
    }

    createContact(object){
        // creating list for empoloyee details
        let listElement = document.createElement("li");
        listElement.setAttribute('id','emp'+object.id);
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
            employees.forEach((employee) => {
                let empInfo = this.createContact(employee);
                this.contactsList.append(empInfo);
                
                this.bindDisplayDetails(employees);
            });
        }
    }

    bindDisplayDetails(modelData){

        this.contactsList.querySelectorAll("li.candit-details").forEach((element)=>{
            element.addEventListener('click',(event)=>{
                let listElement = event.target.tagName == 'P' ? event.target.parentNode : event.target;
                console.log(listElement);
                location.href = '../html/info.html?'+'employee='+listElement.id;
            });
        })
    }
}


export {FormView,InfoView};