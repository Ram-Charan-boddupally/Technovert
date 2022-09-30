import * as utils from './utlis.js';

// Contactus form model 
class Contact{
    constructor(object){
        object = object != null ? object : {};
        this.name = object.name != null ? object.name : "";
        this.isNameEmpty = utils.checkEmpty(this.name);
        this.email = object.emailId != null ? object.emailId : "";
        this.isEmailEmpty = utils.checkEmpty(this.email);
        this.gender = object.gender != null ? object.gender : "";
        this.country = object.country != null ? object.country : "";
        this.phoneNumber = object.telephoneNumber != null ? object.telephoneNumber : "";
        this.orgnaization = object.organizationName != null ? object.organizationName : "";
        this.state = object.cityName != null ? object.cityName : "";
        this.contactMode = object.conctactOption != null ? object.conctactOption : "";
        this.promotionCode = object.promotionCode != null ? object.promotionCode: "";
        this.webAddress = object.webSiteName != null ? object.webSiteName: "";
        this.organizationInfo = object.orgInfo != null ? object.orgInfo : "";
        this.query = object.orgInfo != null ? object.orgInfo : "";
    }
}

// defining object to hold states and countries list
let listHolder = {statesList: ["Select State or provience", "Andhra Pradesh", "Arunachal Pradesh", 
                               "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana","Himachal Pradesh",
                               "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
                               "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
                               "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
                               "Uttarakhand", "West Bengal"],
                 counriesList : ["Select country", "India", "Canada", "Australia", "United Kingdom"],
                 countriesCode : {India : "+91", Canada: "+1", UnitedKingdom:"+44", Australia: "+61"},
                 phonePattern : ""
}

// functions used for contactus page

function populateSelectStatement(selectQuery, optionsArray){
    // function to add options to the select statement 
    let selectStatement = document.querySelector(selectQuery);

    for(let text of optionsArray){
        let value = text.replace(" ","");
        const option = new Option(text,value);
        selectStatement.add(option);
    }
    selectStatement[0].value = "";
}

function addEventListnersToForm(){
    // adding only text validation to the elements to pop errors

    // validating text only fields
    let elements = document.querySelectorAll(".name-field input");
    for(let element of elements){
        element.addEventListener('input', function(event){
            // checking for numbers and special char in field using ultills function
            if(!utils.isOnlyText(event.target.value)){
                event.target.parentElement.querySelector('.user-err-msg').innerHTML = "Only characters allowed";
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

    // alert popup for radio buttons [name = gender] 
    elements = document.querySelectorAll("input[name = gender]");
    elements.forEach(function(element){
        element.addEventListener('click', (event)=>{
            if(event.target.value == "Male"){
                alert("Hello Sir");
            }else{
                alert("Hello madam");
            }
        });
    });    

    // function to modify the RE based on the country
    elements = document.querySelector("#countryName");
    elements.addEventListener('change', function(event){
        document.querySelector('#telephoneNumber').pattern = utils.reList.phoneCountryRE[event.target.value];
        
        document.querySelector('#telephoneNumber').placeholder = utils.reList.placeHolder[event.target.value];
        document.querySelector("#countryCode").innerText = listHolder.countriesCode[event.target.value];
        listHolder.phonePattern = new RegExp(document.querySelector('#telephoneNumber').pattern);

    });

    // validating regular expression for number
    elements = document.querySelector("#telephoneNumber");
    elements.addEventListener("input", function(event){
        let value = event.target.value;
        if(value ==""){
            event.target.parentElement.querySelector(".user-err-msg").innerText = "";
        }else if(!value.match(listHolder.phonePattern)){       
            event.target.parentElement.querySelector(".user-err-msg").innerText = "Enter Valid Phone Number";
        }else{
            event.target.parentElement.querySelector(".user-err-msg").innerText = "";
        }
    });

    // adding promo code based on selected state
    document.querySelector("#stateName").addEventListener("change", function(event){
        if(event.target.value != ""){
            document.querySelector("#promotionCode").value = event.target.value + "-PROMO";
        }
    })

    // validating website address
    elements = document.querySelector(".website-field input");
    elements.addEventListener('input', function(event){
        if(!utils.validateWebAddress(event.target.value)){
            event.target.parentElement.querySelector('.user-err-msg').innerText = "enter valid Address";
        }else{
            event.target.parentElement.querySelector('.user-err-msg').innerText = "";
        }
    })

    // reset the page error messages
    document.querySelector(".reset").addEventListener("click", function(){
        elements = document.querySelectorAll(".user-err-msg");
        for(let element of elements){
            element.innerText = "";
        }
    })

}

function onSubmitForm(){
    document.querySelector("#formApplication").addEventListener("submit", () => {
        const formdata = new FormData(document.querySelector("#formApplication"));

        let data = {};
        // appending data to the object
            for(const pair of formdata.entries()){
            data[pair[0]] = pair[1];
        }

        let contactObject = new Contact(data); 
        
        // poping error message for empty tags 
        if(contactObject.isNameEmpty){
            document.querySelector(".name-field .user-err-msg").innerText = "Name field can't be empty";
        }
        if(contactObject.isEmailEmpty){
            document.querySelector(".email-field .user-err-msg").innerText = "Email field can't be empty";
        }
        if(contactObject.orgnaization == ""){
            document.querySelector(".organization-field .user-err-msg").innerText = "Organisation name field can't be empty";
        }
    })
}

document.addEventListener('load',init());

function init(){
    populateSelectStatement("#stateName", listHolder.statesList);
    populateSelectStatement("#countryName", listHolder.counriesList);
    onSubmitForm();
    addEventListnersToForm();
}