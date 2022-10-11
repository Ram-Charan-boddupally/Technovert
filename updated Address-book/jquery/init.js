import {EmployeeList} from '../jquery/models.js';
import {FormView,ContactsListView,DetailsView} from '../jquery/views.js';

// employee list
let employeeData =  [{name:'Praveen Battula', email: 'praveen@technovert.com', contactInformation: ['+91 923 345 2342','040 30 1231211'], website: 'htttp://www.technovert.com', address: '123 now here \n some street,\n madhapur Hyderabad 500033'},
        {name:'Chandermani Arora', email: 'chandermani@technovert.com', contactInformation: ['+91 9292929292','040 30 1231211'], website: 'htttp://www.technovert.com', address: '123 now here \n some street,\n madhapur Hyderabad 500033'},
        {name:'Shashi Pagadala', email: 'vijay@technovert.com', contactInformation: ['+91 9292929292','040 30 1231211'], website: 'htttp://www.technovert.com', address: '123 now here \n some street,\n madhapur Hyderabad 500033'},
        {name:'Vijay Yalamanchili', email: 'vijay@technovert.com', contactInformation: ['+91 9292929292','040 30 1231211'], website: 'htttp://www.technovert.com', address: '123 now here \n some street,\n madhapur Hyderabad 500033'}
    ]

$(document).ready(function(){
    
    let url = location.pathname.split("/html")[1];
    let model;
    
    // inittialising the model data 
    if(sessionStorage.length > 1){
        model = JSON.parse(sessionStorage.getItem("employeeList"));
    }else{
        model = new EmployeeList(employeeData);
        console.log(model);
        // sessionStorage.setItem("employeeList",JSON.stringify(model));
    }
    console.log(model);
    console.log(JSON.parse(sessionStorage.getItem("employeeList")));

    // url path navigator
    if(url.startsWith('/home.html/')){

        let contactsList = new ContactsListView(model);
    }else if(url.startsWith('/info.html/')){
        
        let empId = new URLSearchParams(location.search).get("employee");

        let contactsList = new ContactsListView(model);
        let detailsBlock = new DetailsView(model,empId);
    }else if(url.startsWith("contactForm.html")){
        
        let contactsList = new ContactsListView(model);
        let contactForm = new FormView(model);
        
        if(edit == 'false'){
           
            contactForm.bindSubmitForm(contactsList,false);
            contactForm.bindResetForm();
        }else{
            
            let empId = new URLSearchParams(location.search).get("employee");
            $("button[type='submit']").text("Update");
            contactForm.bindSubmitForm(contactsList,true,empId);
            
            $("button[type='reset']").text("Cancel");
            contactForm.bindCancelEditForm();
        }
    }
});