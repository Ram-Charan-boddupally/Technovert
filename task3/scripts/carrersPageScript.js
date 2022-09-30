import * as utils from "./utlis.js";

// creating a model for form objects in carrers page
class Carrers{
    constructor(object){
        object = object != null ? object : {}
        this.name = object.name != null ? object.name :"";
        this.isNamEmpty = utils.checkEmpty(this.name);

        this.email = object.emailId != null? object.emailId : "";
        this.isEmailEmpty = utils.checkEmpty(this.email);

        this.role = object.desiredRole != null ? object.desiredRole : "";
        this.fileStatus = object.resume.name != "" ? true : false;
    }
}

function onSubmitForm(){
    document.querySelector("#formApplication").addEventListener("submit",(event) => {

        const formdata = new FormData(document.querySelector("#formApplication"));
        let data = {};
        // appending data to the object
        for (const pair of formdata.entries()) {
            data[pair[0]] = pair[1];
        }

        var carrerObject = new Carrers(data)
        
        // poping errors based on the data       
        if(carrerObject.isNamEmpty){
            document.querySelector(".name-field .user-err-msg").innerText = "Name field can't be empty";
        }
        if(carrerObject.isEmailEmpty){
            document.querySelector(".email-field .user-err-msg").innerText = "Email field can't be empty";
        }
        if(carrerObject.role == ""){
            document.querySelector(".role-field .user-err-msg").innerText = "Role field can't be empty";
        }
        if(!carrerObject.fileStatus){
            document.querySelector(".resume-field .user-err-msg").innerText = "Upload the file";
        }
    });
}

// functions 

// adding only text validation to the elements to pop errors
function addEventListenersToForm(){
    
    // validating text only fields
    let elements = document.querySelectorAll(".name-field input");
    for(let element of elements){
        element.addEventListener('input', function(event){
            // checking for numbers and special char in field using ultills function
            if(!utils.isOnlyText(event.target.value)){
                event.target.parentElement.querySelector('.user-err-msg').innerHTML = "Numbers not allowed";
            }else{
                event.target.parentElement.querySelector('.user-err-msg').innerHTML = "";
            }
        })
    }

    // validating email address format 
    elements = document.querySelector(".email-field input");
    elements.addEventListener('input', function(event){
        if(!utils.validateEmail(event.target.value)){
            event.target.parentElement.querySelector('.user-err-msg').innerHTML = "Enter correct format of email";
        }else{
            event.target.parentElement.querySelector('.user-err-msg').innerHTML = "";            
        }
    });

}


document.addEventListener('load',init());

function init(){
    addEventListenersToForm();
    onSubmitForm();
}