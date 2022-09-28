// function fot validation of the forms emailIds ,names, Empty values 

class PageTemplate {
    constructor(){
        this.forms = document.querySelector(".page-form");
        // regular expression for validation
        this.emailRE = /(^[a-zA-Z]+)([_\.-]|[0-9a-zA-Z])*@([_-]|[0-9a-zA-Z])*(\.[a-zA-Z0-9]+){2}/;
        this.webSiteRE = /^(https|http):\/\/www.[a-zA-Z]+([a-zA-Z0-9]|[-\._\?=\/])+/

        // list of select options
        this.stateSelectOptions =  ["Select State or provience", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
                                    "Goa", "Gujarat", "Haryana","Himachal Pradesh", "Jammu and Kashmir", 
                                    "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", 
                                    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
                                    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
                                    "Uttarakhand", "West Bengal"];

        this.countrySelectOptions = ["India", "Switzerland", "Germany", "Canada", "United States", "Sweden", "Australia", "United Kingdom"];

        let element = document.querySelector("#stateName");
        if(document.contains(element)){
            this.populateStatesSelect();            
            this.populateCountriesSelect();
        }
    }

    // populate the states using the select
    populateStatesSelect(){
        let selectStatement = document.querySelector("#stateName");
        let opt;
        for(let value of this.stateSelectOptions){
            opt = new Option(value,value);
            selectStatement.add(opt);
        }
        selectStatement.options['0'].disabled = true;
    }
    // populate the countries using the select option
    populateCountriesSelect(){
        let selectStatement = document.querySelector("#cntryName");
        selectStatement.style.textAlign = 'center';
        let opt;
        for(let value of this.countrySelectOptions){
            opt = new Option(value,value);
            selectStatement.add(opt);
        }
    }
    //function to add * sign to the elements using JS 
    addMandatorySign(){
        let ne_fields = document.querySelectorAll('.imp-field label'); //ne_fields : non-empty fields
        for(let i=0; i < ne_fields.length; i++){
            // creating a span elemt and appending as child element in label
            let spanEle = document.createElement("span")
            spanEle.innerText = "*";
            spanEle.setAttribute("class","user-msg");
            ne_fields[i].appendChild(spanEle);
        }    
    }

    // adding event listeners to the fields email,phone number,name,annd website addresses
    addEventListners(){

        // adding only text validation to the elements
        let element = document.querySelectorAll(".name-field input");        
        for(let ele of element){
            ele.addEventListener('input', (event)=>{
                for(let ch of event.target.value){
                    if(ch > '0' && ch < '9'){
                        event.target.parentElement.querySelector('span').innerHTML = "Numbers not allowed"
                        break;
                    }
                }
            })
        }

        // adding email validation listner to the page
        element = document.querySelector(".email-field input");
        element.addEventListener('input',(event)=>{
            if(!event.target.value.match(this.emailRE)){
                event.target.parentElement.querySelector('span').innerHTML = "Enter correct format of email"
            } 
        })

        // file name visible only on selection of file 
        // let fileElement = document.querySelector('#resume')
        // if(document.contains(fileElement)){
        //     fileElement.addEventListener('onclick',event=>{
        //         fileElement = fileElement.value;
        //         fileElement.style.contentVisibility = "visible";
        //     })
        // }

        // event listner for radio buttons [name = gender]

        element = document.querySelectorAll("input[name = gender]");
        if(document.contains(element[0])){
            element.forEach((ele)=> {
                ele.addEventListener('click',(event)=>{
                    pnoun = ""
                    if(event.target.value == "Male"){
                        pnoun = "Sir";
                    }else{
                        pnoun = "Madam";
                    }
                    alert("Hello "+pnoun);
                })
            })
        }

        // validating website address
        element = document.querySelector(".website-field input");
        if(document.contains(element)){
            element.addEventListener('input', (event)=>{
                if(!event.target.value.match(this.webSiteRE)){
                    console.log(event.target.value, "not match")
                    let ele = event.target.parentElement.querySelector('span');
                    if(ele){
                        ele.innerHTML = "Enter correct webAddress";
                    }else{
                        let spanEle = document.createElement("span")
                        spanEle.innerText = "Enter correct webAddress ";
                        spanEle.setAttribute("class","user-msg");
                        event.target.parentElement.querySelector('label').appendChild(spanEle);
                    }
                }else{
                    console.log(event.target.value, "match");
                    event.target.parentElement.querySelector('span').remove();
                }
            })
        }
    }

    // form validation function checking for empty important fields and poping up error message
    validateForm(){
        let status = true;
        this.forms.querySelectorAll(".imp-field").forEach((element)=>{
            let value = element.querySelector('input').value;
            if(value == ""){
                element.querySelector('.user-msg').innerHTML = "Field Cant Be Empty";
                status = false;
            }
        })

        if(!status){
            let statusElement = document.getElementById("unSuccesfullSubmittion");
            statusElement.style.color = 'red';
            statusElement.style.display = 'initial';
        }else{
            let statusElement = document.getElementById("succesfullSubmittion");
            statusElement.style.color = 'green';
            statusElement.style.display = 'initial';
        }
    } 
    
}
 
function main(){
    let obj = new PageTemplate()
    obj.addMandatorySign();
    obj.addEventListners();   
}

document.addEventListener('load',main());


// function reset(form){
//     console.log("ram");
//     form.querySelectorAll('input').forEach((ele)=>{
//         ele.value = "";
//     })
//     if(form.contains('input[type=radio]')){
//         form.querySelectorAll('input[type=radio]').checked = false;
//     }
//     if(form.contains('textarea')){
//         form.querySelectorAll('textarea').forEach(ele => {ele.innerHTML = ""})
//     }
//     if(form.contains('select')){
//         form.querySelector('select').selectedIndex = 0;
//     }
//     document.getElementById("unSuccesfullSubmittion").style.display = 'none';
//     document.getElementById("succesfullSubmittion").style.display = 'none';
// }
