import {EmployeeList} from '../js/models.js';
import {FormView,InfoView} from '../js/views.js';

// defining data
let initialContacts = [{name:'Praveen Battula', email: 'praveen@technovert.com', contactInformation: ['+91 923 345 2342','040 30 1231211'], website: 'htttp://www.technovert.com', address: '123 now here some street, madhapur Hyderabad 500033'},
        {name:'Chandermani Arora', email: 'chandermani@technovert.com', contactInformation: ['+91 9292929292','040 30 1231211'], website: 'htttp://www.technovert.com', address: '123 now here some street, madhapur Hyderabad 500033'},
        {name:'Shashi Pagadala', email: 'vijay@technovert.com', contactInformation: ['+91 9292929292','040 30 1231211'], website: 'htttp://www.technovert.com', address: '123 now here some street, madhapur Hyderabad 500033'},
        {name:'Vijay Yalamanchili', email: 'vijay@technovert.com', contactInformation: ['+91 9292929292','040 30 1231211'], website: 'htttp://www.technovert.com', address: '123 now here some street, madhapur Hyderabad 500033'}
    ]

// controllers

document.addEventListener('load',init());

function init(){
    let model = new EmployeeList(initialContacts); 
    let contactsList = new InfoView(); 
    let contactsForm = new FormView(); 

    // displaying info in the view
    contactsList.displayContacts(model.employeeList);
    // contactsList.bindDisplayDetails(model.employeeList);

    contactsForm.bindSubmitForm(model,contactsList); 
    contactsForm.bindResetForm();
}